using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using cabandos.Server.Data;
using cabandos.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;

namespace cabandos.Server.Features.Services;

public interface IChatService
{
    Task<string> ConnectToChatRoomAsync(User user, string otherUserId, WebSocket webSocket);
    Task HandleWebSocketMessagesAsync(WebSocket webSocket, string chatRoomId, ApplicationContext applicationContext);
    Task<List<ChatMessage>> GetChatHistoryAsync(string userId, string otherUserId, ApplicationContext applicationContext, int skip, int take);
}

public class ChatService : IChatService
{
    private static readonly ConcurrentDictionary<string, List<WebSocket>> _chatRooms = new();

    public async Task<List<ChatMessage>> GetChatHistoryAsync(string userId, string otherUserId, ApplicationContext applicationContext, int skip, int take)
    {
        string chatRoomId = GetChatRoomId(userId, otherUserId);
        return await applicationContext.ChatMessages
            .Where(cm => cm.ChatRoomId == chatRoomId)
            .OrderByDescending(cm => cm.SentAt)
            .Skip(skip)
            .Take(take)
            .ToListAsync();
    }

    public async Task<string> ConnectToChatRoomAsync(User user, string otherUserId, WebSocket webSocket)
    {
        if (user == null || string.IsNullOrEmpty(user.Id))
            throw new InvalidOperationException("Invalid user.");

        string chatRoomId = GetChatRoomId(user.Id, otherUserId);

        _chatRooms.AddOrUpdate(chatRoomId, new List<WebSocket> { webSocket }, (key, list) =>
        {
            list.Add(webSocket);
            return list;
        });

        return chatRoomId;
    }

    public async Task HandleWebSocketMessagesAsync(WebSocket webSocket, string chatRoomId, ApplicationContext applicationContext)
    {
        try
        {
            while (webSocket.State == WebSocketState.Open)
            {
                using (var memoryStream = new MemoryStream())
                {
                    WebSocketReceiveResult result;
                    do
                    {
                        var buffer = new byte[1024]; 
                        result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                        memoryStream.Write(buffer, 0, result.Count); 
                    }
                    while (!result.EndOfMessage); 

                    memoryStream.Seek(0, SeekOrigin.Begin); 
                    using (var reader = new StreamReader(memoryStream, Encoding.UTF8))
                    {
                        string messageString = await reader.ReadToEndAsync();

                        JsonSerializerOptions options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                        var chatMessage = JsonSerializer.Deserialize<ChatMessage>(messageString, options);

                        if (chatMessage != null)
                        {
                            chatMessage.ChatRoomId = chatRoomId;
                            applicationContext.ChatMessages.Add(chatMessage);
                            await applicationContext.SaveChangesAsync();

                            foreach (var client in _chatRooms[chatRoomId])
                            {
                                if (client != webSocket && client.State == WebSocketState.Open)
                                {
                                    var response = Encoding.UTF8.GetBytes(messageString);
                                    await client.SendAsync(new ArraySegment<byte>(response), WebSocketMessageType.Text, true, CancellationToken.None);
                                }
                            }
                        }

                        if (result.CloseStatus.HasValue)
                        {
                            break;
                        }
                    }
                }
            }
        }
        finally
        {
            _chatRooms.AddOrUpdate(chatRoomId, new List<WebSocket>(), (key, list) =>
            {
                list.Remove(webSocket);
                return list;
            });

            await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", CancellationToken.None);
        }
    }

    private string GetChatRoomId(string userId, string otherUserId)
    {
        var sortedUserIds = new[] { userId, otherUserId }.OrderBy(id => id).ToArray();
        return string.Join("-", sortedUserIds);
    }
}

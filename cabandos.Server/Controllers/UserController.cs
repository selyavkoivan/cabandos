using cabandos.Server.Domain.DTO;
using cabandos.Server.Features.Services;
using cabandos.Server.Features.Handlers.Users;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.WebSockets;
using System.Text;
using System.Collections.Concurrent;

namespace cabandos.Server.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    private static ConcurrentDictionary<string, List<WebSocket>> _chatRooms = new ConcurrentDictionary<string, List<WebSocket>>();


    [HttpGet("chat/{otherUserId}")]
    [Authorize]
    public async Task Get(string otherUserId)
    {
        if (HttpContext.WebSockets.IsWebSocketRequest)
        {
            var me = await _mediator.Send(new GetMeQuery(HttpContext.User)) as Domain.Entities.User;

            if (me.Id== null)
            {
                HttpContext.Response.StatusCode = 400;
                return; 
            }
            
            using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();

            string clientId = Guid.NewGuid().ToString();
            string chatRoomId = GetChatRoomId(me.Id, otherUserId); 

            _chatRooms.AddOrUpdate(chatRoomId, new List<WebSocket> { webSocket }, (key, list) =>
            {
                list.Add(webSocket);
                return list;
            });

            Console.WriteLine($"Client {clientId} connected to chat room {chatRoomId}.");

            await HandleWebSocketConnection(webSocket, clientId, chatRoomId);
        }
        else
        {
            HttpContext.Response.StatusCode = 400;
        }
    }

    private string GetChatRoomId(string userId, string otherUserId)
    {
        var sortedUserIds = new[] { userId, otherUserId }.OrderBy(u => u).ToList();
        return string.Join("-", sortedUserIds);
    }

    private async Task HandleWebSocketConnection(WebSocket webSocket, string clientId, string chatRoomId)
    {
        var buffer = new byte[1024 * 4];
        WebSocketReceiveResult result;

        try
        {
            do
            {
                result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                string message = Encoding.UTF8.GetString(buffer, 0, result.Count);

                Console.WriteLine($"Received from {clientId}: {message}");

                foreach (var client in _chatRooms[chatRoomId])
                {
                    if (client != webSocket && client.State == WebSocketState.Open)
                    {
                        var response = Encoding.UTF8.GetBytes($"{clientId}: {message}");
                        await client.SendAsync(new ArraySegment<byte>(response), WebSocketMessageType.Text, true, CancellationToken.None);
                    }
                }
            }
            while (!result.CloseStatus.HasValue);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error for {clientId}: {ex.Message}");
        }
        finally
        {
            _chatRooms.AddOrUpdate(chatRoomId, new List<WebSocket>(), (key, list) =>
            {
                list.Remove(webSocket);
                return list;
            });
            await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", CancellationToken.None);
            Console.WriteLine($"Client {clientId} disconnected from chat room {chatRoomId}.");
        }
    }


    [HttpPost("search")]
    public async Task<IActionResult> SearchUsers([FromBody] SearchUsersDTO searchUserDTO) =>
        Ok(await _mediator.Send(new SearchUsersQuery(searchUserDTO)));

    [HttpGet("all")]
    public async Task<IActionResult> GetAllUsers() =>
        Ok(await _mediator.Send(new SearchUsersQuery(new SearchUsersDTO
        { IncludeRoles = true })));

    [HttpPost("me")]
    public async Task<IActionResult> GetMe([FromBody] SearchUsersDTO searchUserDTO) =>
        Ok(await _mediator.Send(new GetMeQuery(HttpContext.User, searchUserDTO)));

    [HttpGet("profile/{username}")]
    public async Task<IActionResult> GetUser(string username) =>
        Ok(await _mediator.Send(new GetUserByUsernameQuery(
            new SearchUsersDTO (username, true, true))));

    [HttpPost("profile")]
    public async Task<IActionResult> GetUser([FromBody] SearchUsersDTO searchUserDTO) =>
        Ok(await _mediator.Send(new GetUserByUsernameQuery(searchUserDTO)));

    [HttpPost("edit/userdata/{username}")]
    public async Task<IActionResult> EditUser(string username, [FromBody] UserDTO userDTO)
    {
        await _mediator.Send(new EditUserCommand(username, userDTO));
        return NoContent();
    }

    [HttpPost("edit/password/{username}")]
    public async Task<IActionResult> EditUserPassword(string username, [FromBody] UserDTO userDTO)
    {
        await _mediator.Send(new EditUserPasswordCommand(username, userDTO));
        return NoContent();
    }

    [HttpPost("edit/avatar/{userName}")]
    public async Task<IActionResult> UploadAvatar(string userName, IFormFile file)
    {
        await _mediator.Send(new UploadUserAvatarCommand(userName, file));
        return Ok();
    }
}
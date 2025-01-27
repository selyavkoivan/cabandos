using cabandos.Server.Domain.Entities;
using cabandos.Server.Features.Services;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Net.WebSockets;
using System.Security.Claims;

namespace cabandos.Server.Features.Handlers.Chat;

public class InitiateChatHandler : IRequestHandler<InitiateChatCommand, InitiateChatResponse>
{
    private readonly UserManager<User> _userManager;
    private readonly IChatService _chatService;

    public InitiateChatHandler(UserManager<User> userManager, IChatService chatService)
    {
        _userManager = userManager;
        _chatService = chatService;
    }

    public async Task<InitiateChatResponse> Handle(InitiateChatCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.GetUserAsync(request.User);

        string chatRoomId = await _chatService.ConnectToChatRoomAsync(user, request.OtherUserId, request.WebSocket);

        await _chatService.HandleWebSocketMessagesAsync(request.WebSocket, chatRoomId);

        return new InitiateChatResponse(true, "Connection established.");
    }
}

public record InitiateChatCommand(ClaimsPrincipal User, string OtherUserId, WebSocket WebSocket) : IRequest<InitiateChatResponse>;
public record InitiateChatResponse(bool Success, string Message);

﻿
using cabandos.Server.Data;
using cabandos.Server.Domain.Entities;
using cabandos.Server.Features.Services;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace cabandos.Server.Features.Handlers.Chat;

public class GetChatHistoryHandler : IRequestHandler<GetChatHistoryQuery, GetChatHistoryResponse>
{
    private readonly ApplicationContext _dbcontext;
    private readonly UserManager<User> _userManager;
    private readonly IChatService _chatService;

    public GetChatHistoryHandler(UserManager<User> userManager, ApplicationContext dbcontext, 
        IChatService chatService)
    {
        _userManager = userManager;
        _dbcontext = dbcontext;
        _chatService = chatService;
    }
 
    public async Task<GetChatHistoryResponse> Handle(GetChatHistoryQuery request, CancellationToken cancellationToken)
    {
        var user = await _userManager.GetUserAsync(request.User);

        if (user == null)
        {
            return new GetChatHistoryResponse(false, "User not found.", null);
        }

        var messages = await _chatService.GetChatHistoryAsync(user.Id, request.OtherUserId, _dbcontext, request.Skip, request.Take);

        return new GetChatHistoryResponse(true, null, messages);
    }

}

public record GetChatHistoryQuery(ClaimsPrincipal User, string OtherUserId, int Skip, int Take) : IRequest<GetChatHistoryResponse>;
public record GetChatHistoryResponse(bool Success, string? Message, List<ChatMessage>? Messages);

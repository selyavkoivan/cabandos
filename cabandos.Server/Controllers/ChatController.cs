﻿using cabandos.Server.Features.Handlers.Chat;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace cabandos.Server.Controllers;

[ApiController]
[Route("api/chat")]
[Authorize]
public class ChatController : ControllerBase
{
    private readonly IMediator _mediator;

    public ChatController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("{otherUserId}")]
    public async Task Get(string otherUserId)
    {
        if (HttpContext.WebSockets.IsWebSocketRequest)
        {
            using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();

            var result = await _mediator.Send(new InitiateChatCommand(HttpContext.User, otherUserId, webSocket));

            if (!result.Success)
            {
                throw new (result.Message);
            }
        }
        else
        {
            throw new ();
        }
    }
}

using cabandos.Server.Features.Handlers.Chat;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace cabandos.Server.Controllers;

[Authorize]
[ApiController]
[Route("api/chat")]
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


    [HttpGet("history/{otherUserId}")]
    public async Task<IActionResult> GetChatHistory(string otherUserId, [FromQuery] int skip = 0, [FromQuery] int take = 5)
    {
        var query = new GetChatHistoryQuery(User, otherUserId, skip, take);
        var response = await _mediator.Send(query);

        if (!response.Success)
        {
            return BadRequest(response.Message);
        }

        return Ok(response.Messages);
    }
}

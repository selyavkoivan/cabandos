using cabandos.Server.Features.Auth.Exceptions;
using cabandos.Server.Features.Auth.Handlers;
using cabandos.Server.Domain.DTO;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace cabandos.Server.Controllers;

[ApiController]
[Route("api/user")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("isLogin")]
    public async Task<IActionResult> IsSignIn()
    {
        var result = await _mediator.Send(new IsSignInQuery(User));
        return Ok(result);
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _mediator.Send(new LogoutCommand());
        return Ok();
    }

    [HttpPost("signup")]
    public async Task<IActionResult> SignUp([FromBody] UserDto userDto)
    {
        await _mediator.Send(new SignUpCommand(userDto));
        return Ok();
    }

    [HttpPost("signin")]
    public async Task<IActionResult> SignIn([FromBody] UserDto userDto)
    {
        await _mediator.Send(new SignInCommand(userDto));
        return Ok();
    }
}

﻿using cabandos.Server.Features.Users.Commands;
using cabandos.Server.Features.Users.Queries;
using cabandos.Server.Models.DTO;
using MediatR;
using Microsoft.AspNetCore.Mvc;

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

    [HttpGet("isLogin")]
    public async Task<IActionResult> IsSignIn()
    {
        var result = await _mediator.Send(new IsSignInQuery(User));
        return Ok(result);
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _mediator.Send(new LogoutCommand());
        return Ok();
    }

    [HttpPost("signup")]
    public async Task<IActionResult> SignUp([FromBody] UserDto userDto)
    {
        var result = await _mediator.Send(new SignUpCommand(userDto));
        if (result.Succeeded)
            return Ok();

        return BadRequest(new { error = result.Error, error_description = result.Description });
    }

    [HttpPost("signin")]
    public async Task<IActionResult> SignIn([FromBody] UserDto userDto)
    {
        var result = await _mediator.Send(new SignInCommand(userDto));
        if (result.Succeeded)
            return Ok();

        return BadRequest(new { error = result.Error, error_description = result.Description });
    }
}

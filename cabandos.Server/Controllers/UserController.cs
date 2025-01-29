using cabandos.Server.Domain.DTO;
using cabandos.Server.Features.Services;
using cabandos.Server.Features.Handlers.Users;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace cabandos.Server.Controllers;

[Authorize]
[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
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
using cabandos.Server.Models;
using cabandos.Server.Models.DTO;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace cabandos.Server.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    private readonly IMediator _mediator;

    public UserController(UserManager<User> userManager, SignInManager<User> signInManager,
        RoleManager<IdentityRole> roleManager, IMediator mediator)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _signInManager = signInManager;

        _mediator = mediator;
    }

    [HttpGet("isLogin")]
    public IActionResult IsSignIn() => Ok(_signInManager.IsSignedIn(User));

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok();
    }

    [HttpPost("signup")]
    public async Task<IActionResult> SignUp([FromBody] UserDto userDto)
    {
       


        try
        {
            var user = new User(userDto);
            var answer = await _userManager.CreateAsync(user, userDto.Password!);

            if (answer.Succeeded)
            {
                try
                {
                    await _userManager.AddToRoleAsync(user, "user");

                    return Ok();
                }
                catch
                {
                    await _userManager.DeleteAsync(user);
                    return BadRequest(new
                    {
                        error = "email",
                        error_description = "какая то херня"
                    });
                }
            }

            return BadRequest("fff");
        }
        catch (ArgumentNullException)
        {
            return BadRequest(new
            {
                error = "repeat password",
                error_description = "Please repeat password"
            });
        }
    }

    [HttpPost("signin")]
    public async Task<IActionResult> SignIn([FromBody] UserDto userDto)
    {
        var user = await _userManager.FindByNameAsync(userDto.Username);
        var result = await _signInManager.PasswordSignInAsync(user.UserName, userDto.SignInPassword, false, false);
        if (result.Succeeded)
        {
            return Ok();
        }

        return BadRequest(new
        {
            error = "SignInFailed",
            error_description = "какая то херня"
        });
    }



}
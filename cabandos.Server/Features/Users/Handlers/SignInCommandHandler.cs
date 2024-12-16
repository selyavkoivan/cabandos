using cabandos.Server.Features.Users.Commands;
using cabandos.Server.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace cabandos.Server.Features.Users.Handlers;

public class SignInCommandHandler : IRequestHandler<SignInCommand, (bool Succeeded, string Error, string Description)>
{
    private readonly SignInManager<User> _signInManager;
    private readonly UserManager<User> _userManager;

    public SignInCommandHandler(SignInManager<User> signInManager, UserManager<User> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }

    public async Task<(bool Succeeded, string Error, string Description)> Handle(SignInCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByNameAsync(request.UserDto.Username);
        if (user == null)
            return (false, "UserNotFound", "User does not exist.");

        var result = await _signInManager.PasswordSignInAsync(user.UserName, request.UserDto.SignInPassword, false, false);
        if (result.Succeeded)
            return (true, null, null);

        return (false, "SignInFailed", "Invalid credentials.");
    }
}
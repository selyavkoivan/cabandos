using cabandos.Server.Features.Users.Commands;
using cabandos.Server.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace cabandos.Server.Features.Users.Handlers;

public class SignUpCommandHandler : IRequestHandler<SignUpCommand, (bool Succeeded, string Error, string Description)>
{
    private readonly UserManager<User> _userManager;

    public SignUpCommandHandler(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<(bool Succeeded, string Error, string Description)> Handle(SignUpCommand request, CancellationToken cancellationToken)
    {
        var user = new User(request.UserDto);
        var result = await _userManager.CreateAsync(user, request.UserDto.Password!);

        if (result.Succeeded)
            return (true, null, null);

        return (false, "SignUpFailed", "Could not create user.");
    }
}
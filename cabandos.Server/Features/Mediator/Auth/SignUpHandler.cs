using cabandos.Server.Models;
using cabandos.Server.Models.DTO;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace cabandos.Server.Features.Mediator.Auth;

public class SignUpHandler : IRequestHandler<SignUpCommand, (bool Succeeded, string Error, string Description)>
{
    private readonly UserManager<User> _userManager;

    public SignUpHandler(UserManager<User> userManager)
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

public class SignUpCommand : IRequest<(bool Succeeded, string Error, string Description)>
{
    public UserDto UserDto { get; }

    public SignUpCommand(UserDto userDto)
    {
        UserDto = userDto;
    }
}
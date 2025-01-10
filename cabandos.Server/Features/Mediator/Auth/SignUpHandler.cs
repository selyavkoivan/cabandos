using cabandos.Server.Features.Exceptions;
using cabandos.Server.Models;
using cabandos.Server.Models.DTO;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace cabandos.Server.Features.Mediator.Auth;

public class SignUpHandler : IRequestHandler<SignUpCommand, IdentityResult>
{
    private readonly UserManager<User> _userManager;

    public SignUpHandler(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<IdentityResult> Handle(SignUpCommand request, CancellationToken cancellationToken)
    {
        var user = new User(request.UserDto);
        var result = await _userManager.CreateAsync(user, request.UserDto.Password!);

        if (result.Succeeded)
            return result;

        throw new AuthException("SignInFailed", result);
    }
}

public class SignUpCommand : IRequest<IdentityResult>
{
    public UserDto UserDto { get; }

    public SignUpCommand(UserDto userDto)
    {
        UserDto = userDto;
    }
}
using cabandos.Server.Features.Auth.Exceptions;
using cabandos.Server.Domain.DTO;
using MediatR;
using Microsoft.AspNetCore.Identity;
using cabandos.Server.Domain.Entities;

namespace cabandos.Server.Features.Auth.Handlers;

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
    public UserDTO UserDto { get; }

    public SignUpCommand(UserDTO userDto)
    {
        UserDto = userDto;
    }
}
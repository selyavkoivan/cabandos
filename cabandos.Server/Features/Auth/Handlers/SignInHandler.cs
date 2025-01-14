using cabandos.Server.Features.Auth.Exceptions;
using cabandos.Server.Domain.DTO;
using MediatR;
using Microsoft.AspNetCore.Identity;
using cabandos.Server.Domain.Entities;

namespace cabandos.Server.Features.Auth.Handlers;

public class SignInHandler : IRequestHandler<SignInCommand, SignInResult>
{
    private readonly SignInManager<User> _signInManager;
    private readonly UserManager<User> _userManager;

    public SignInHandler(SignInManager<User> signInManager, UserManager<User> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }

    public async Task<SignInResult> Handle(SignInCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByNameAsync(request.UserDto.Username);

        if (user == null) throw new AuthException("SignInFailed", "User does not exist");


        var result = await _signInManager.PasswordSignInAsync(user.UserName, request.UserDto.SignInPassword, false, false);
        if (result.Succeeded)
            return result;

        throw new AuthException("SignInFailed", "Incorrect password");
    }
}

public class SignInCommand : IRequest<SignInResult>
{
    public UserDto UserDto { get; }

    public SignInCommand(UserDto userDto)
    {
        UserDto = userDto;
    }
}
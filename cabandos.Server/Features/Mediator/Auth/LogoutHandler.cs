using cabandos.Server.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

using Task = System.Threading.Tasks.Task;

namespace cabandos.Server.Features.Mediator.Auth;

public class LogoutHandler : IRequestHandler<LogoutCommand>
{
    private readonly SignInManager<User> _signInManager;

    public LogoutHandler(SignInManager<User> signInManager)
    {
        _signInManager = signInManager;
    }

    public async Task Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        await _signInManager.SignOutAsync();
        return;
    }
}

public class LogoutCommand : IRequest
{
}
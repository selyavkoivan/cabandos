using cabandos.Server.Features.Users.Commands;
using cabandos.Server.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

using Task = System.Threading.Tasks.Task;

namespace cabandos.Server.Features.Users.Handlers;

public class LogoutCommandHandler : IRequestHandler<LogoutCommand>
{
    private readonly SignInManager<User> _signInManager;

    public LogoutCommandHandler(SignInManager<User> signInManager)
    {
        _signInManager = signInManager;
    }

    public async Task Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        await _signInManager.SignOutAsync();
        return;
    }
}
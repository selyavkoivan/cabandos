using cabandos.Server.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Task = System.Threading.Tasks.Task;

namespace cabandos.Server.Features.Handlers.Auth;

public class IsSignInHandler : IRequestHandler<IsSignInQuery, bool>
{
    private readonly SignInManager<User> _signInManager;

    public IsSignInHandler(SignInManager<User> signInManager)
    {
        _signInManager = signInManager;
    }

    public Task<bool> Handle(IsSignInQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(_signInManager.IsSignedIn(request.User));
    }
}

public class IsSignInQuery : IRequest<bool>
{
    public ClaimsPrincipal User { get; }

    public IsSignInQuery(ClaimsPrincipal user)
    {
        User = user;
    }
}
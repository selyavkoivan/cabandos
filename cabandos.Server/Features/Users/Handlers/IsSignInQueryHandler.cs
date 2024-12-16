using cabandos.Server.Features.Users.Queries;
using cabandos.Server.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

using Task = System.Threading.Tasks.Task;

namespace cabandos.Server.Features.Users.Handlers;

public class IsSignInQueryHandler : IRequestHandler<IsSignInQuery, bool>
{
    private readonly SignInManager<User> _signInManager;

    public IsSignInQueryHandler(SignInManager<User> signInManager)
    {
        _signInManager = signInManager;
    }

    public async Task<bool> Handle(IsSignInQuery request, CancellationToken cancellationToken)
    {
        return await Task.FromResult(_signInManager.IsSignedIn(request.User));
    }
}
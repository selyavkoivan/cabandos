using cabandos.Server.Data;
using MediatR;
using cabandos.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using cabandos.Server.Migrations;

namespace cabandos.Server.Features.Users.Handlers;

public class GetMeHandler : IRequestHandler<GetMeQuery, User?>
{
    private UserManager<User> _userManager;

    public GetMeHandler(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<User?> Handle(GetMeQuery request, CancellationToken cancellationToken)
    {
        return await this._userManager.GetUserAsync(request.User);
    }
}

public class GetMeQuery : IRequest<User?>
{
    public ClaimsPrincipal User { get; }

    public GetMeQuery(ClaimsPrincipal user) => User = user;
}
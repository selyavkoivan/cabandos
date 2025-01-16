using cabandos.Server.Data;
using MediatR;
using cabandos.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using cabandos.Server.Migrations;

namespace cabandos.Server.Features.Users.Handlers;

public class GetMeWithTasksHandler : IRequestHandler<GetMeWithTasksQuery, User?>
{
    private ApplicationContext _context;
    private UserManager<User> _userManager;

    public GetMeWithTasksHandler(ApplicationContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async Task<User?> Handle(GetMeWithTasksQuery request, CancellationToken cancellationToken)
    {
        var user = await this._userManager.GetUserAsync(request.User);
        if (user is not null)
        {
            await _context.Entry(user).Collection(u => u.Tasks).LoadAsync();
        }

        return user;
    }
}

public class GetMeWithTasksQuery : IRequest<User?>
{
    public ClaimsPrincipal User { get; }

    public GetMeWithTasksQuery(ClaimsPrincipal user) => User = user;
}
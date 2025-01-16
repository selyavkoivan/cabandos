using cabandos.Server.Data;
using MediatR;
using cabandos.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using cabandos.Server.Migrations;

namespace cabandos.Server.Features.Users.Handlers;

public class GetMeHandler : IRequestHandler<GetMeQuery, object>
{
    private ApplicationContext _context;
    private UserManager<User> _userManager;

    public GetMeHandler(ApplicationContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async Task<object> Handle(GetMeQuery request, CancellationToken cancellationToken)
    {
        var user = await this._userManager.GetUserAsync(request.User);
        if (user is not null)
        {
            if (request.IncludeTasks)
            {
                await _context.Entry(user).Collection(u => u.Tasks).LoadAsync(cancellationToken);
            }

            if (request.IncludeRoles)
            {
                return new
                {
                    User = user,
                    Roles = _context.UserRoles
                            .Where(ur => ur.UserId == user.Id)
                            .Join(
                                _context.Roles,
                                ur => ur.RoleId,
                                role => role.Id,
                                (ur, role) => role.Name
                            )
                            .ToList()
                };
            }
        }

        return user;
    }
}

public class GetMeQuery : IRequest<object>
{
    public ClaimsPrincipal User { get; }
    public bool IncludeRoles { get; }
    public bool IncludeTasks { get; }

    public GetMeQuery(ClaimsPrincipal user, bool includeRoles = false, bool includeTasks = false)
    {
        User = user;
        IncludeRoles = includeRoles;
        IncludeTasks = includeTasks;
    }
}
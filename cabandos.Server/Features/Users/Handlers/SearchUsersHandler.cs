using cabandos.Server.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace cabandos.Server.Features.Users.Handlers;

public class SearchUsersHandler : IRequestHandler<SearchUsersQuery, List<object>>
{
    private ApplicationContext _context;

    public SearchUsersHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<List<object>> Handle(SearchUsersQuery request, CancellationToken cancellationToken)
    {
        var usersQuery = _context.Users.Where(u => u.UserName.Contains(request.Username)).AsQueryable();

        if (request.IncludeTasks)
        {
            usersQuery = usersQuery.Include(u => u.Tasks);
        }

        if (request.IncludeRoles)
        {
            return usersQuery
                .Select(user => new
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
                })
                .Cast<object>().ToList();
        }

        return await usersQuery.Cast<object>()
            .ToListAsync(cancellationToken);
    }
}

public class SearchUsersQuery : IRequest<List<object>>
{
    public string Username { get; }
    public bool IncludeRoles { get; }
    public bool IncludeTasks { get; }

    public SearchUsersQuery(string username = "", bool includeRoles = false,
        bool includeTasks = false)
    {
        Username = username;
        IncludeRoles = includeRoles;
        IncludeTasks = includeTasks;
    }
}
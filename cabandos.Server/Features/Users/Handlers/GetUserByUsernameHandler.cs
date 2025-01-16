using cabandos.Server.Data;
using MediatR;
using cabandos.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using cabandos.Server.Migrations;

namespace cabandos.Server.Features.Users.Handlers;

public class GetUserByUsernameHandler : IRequestHandler<GetUserByUsernameQuery, object>
{
    private ApplicationContext _context;

    public GetUserByUsernameHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<object> Handle(GetUserByUsernameQuery request, CancellationToken cancellationToken)
    {
        var usersQuery = _context.Users.Where(u => u.UserName == request.Username).AsQueryable();

        if(usersQuery is not null)
        {
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
                    .Cast<object>().FirstOrDefault(cancellationToken);
            }

            return await usersQuery.Cast<object>()
                .FirstAsync(cancellationToken);
        }

        throw new Exception(); //UserNotFoundException
    }
}

public class GetUserByUsernameQuery : IRequest<object>
{
    public string Username { get; }
    public bool IncludeRoles { get; }
    public bool IncludeTasks { get; }

    public GetUserByUsernameQuery(string username, bool includeRoles = false, 
        bool includeTasks = false)
    {
        Username = username;
        IncludeRoles = includeRoles;
        IncludeTasks = includeTasks;
    }
}
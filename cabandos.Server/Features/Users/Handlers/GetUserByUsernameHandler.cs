using cabandos.Server.Data;
using MediatR;
using cabandos.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using cabandos.Server.Migrations;
using cabandos.Server.Domain.DTO;

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
        var usersQuery = _context.Users
    .Where(u => u.UserName == request.SearchUsersOptions.Username)
    .AsQueryable();

        if (usersQuery is not null)
        {

            if (usersQuery is not null && request.SearchUsersOptions.IncludeTasks)
            {
                usersQuery = usersQuery.Include(u => u.Tasks);
            }

            var user = await usersQuery.FirstOrDefaultAsync(cancellationToken);

            if (request.SearchUsersOptions.IncludeRoles)
            {
                var roles = _context.UserRoles
                        .Where(ur => ur.UserId == user.Id)
                        .Join(
                            _context.Roles,
                            ur => ur.RoleId,
                            role => role.Id,
                            (ur, role) => role.Name
                        )
                        .ToList();
               return new {user, roles };
            }

            return user;

        }


        throw new Exception(); //UserNotFoundException
    }
}

public class GetUserByUsernameQuery : IRequest<object>
{
    public SearchUsersDTO SearchUsersOptions { get; }

    public GetUserByUsernameQuery(SearchUsersDTO searchUsersDTO)
        => SearchUsersOptions = searchUsersDTO;
}
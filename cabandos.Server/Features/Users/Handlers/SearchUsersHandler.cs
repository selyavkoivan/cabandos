using cabandos.Server.Data;
using cabandos.Server.Domain.DTO;
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
        var usersQuery = _context.Users.Where(u => u.UserName.Contains(request.SearchUsersOptions.Username)).AsQueryable();

        if (request.SearchUsersOptions.IncludeTasks)
        {
            usersQuery = usersQuery.Include(u => u.Tasks);
        }

        if (request.SearchUsersOptions.IncludeRoles)
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
    public SearchUsersDTO SearchUsersOptions { get; } = new ();

    public SearchUsersQuery() { }

    public SearchUsersQuery(SearchUsersDTO searchUsersDTO) 
        => SearchUsersOptions = searchUsersDTO;
}
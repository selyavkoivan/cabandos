using cabandos.Server.Data;
using MediatR;
using cabandos.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace cabandos.Server.Features.Users.Handlers;

public class GetUsersWithTasksHandler : IRequestHandler<GetUsersWithTasksQuery, List<User>>
{
    private ApplicationContext _context;

    public GetUsersWithTasksHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<List<User>> Handle(GetUsersWithTasksQuery request, CancellationToken cancellationToken)
    {
        return await _context.Users.Include(u => u.Tasks).ToListAsync();
    }
}

public class GetUsersWithTasksQuery : IRequest<List<User>>
{
}
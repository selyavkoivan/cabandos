using cabandos.Server.Data;
using MediatR;
using cabandos.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace cabandos.Server.Features.Users.Handlers;

public class GetUsersHandler : IRequestHandler<GetUsersQuery, List<User>>
{
    private ApplicationContext _context;

    public GetUsersHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<List<User>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
    {
        return await _context.Users.ToListAsync();
    }
}

public class GetUsersQuery : IRequest<List<User>>
{
}
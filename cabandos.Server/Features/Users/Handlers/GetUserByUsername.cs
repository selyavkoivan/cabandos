using cabandos.Server.Data;
using MediatR;
using cabandos.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace cabandos.Server.Features.Users.Handlers;

public class GetUserByUsernameHandler : IRequestHandler<GetUserByUsernameQuery, User?>
{
    private ApplicationContext _context;

    public GetUserByUsernameHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<User?> Handle(GetUserByUsernameQuery request, CancellationToken cancellationToken)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.UserName == request.Username);
    }
}

public class GetUserByUsernameQuery : IRequest<User?>
{
    public string Username { get; }

    public GetUserByUsernameQuery(string username) => Username = username;
}
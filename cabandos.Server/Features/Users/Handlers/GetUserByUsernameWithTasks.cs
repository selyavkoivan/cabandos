using cabandos.Server.Data;
using MediatR;
using cabandos.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace cabandos.Server.Features.Users.Handlers;

public class GetUserByUsernameWithTasksHandler : IRequestHandler<GetUserByUsernameWithTasksQuery, User?>
{
    private ApplicationContext _context;

    public GetUserByUsernameWithTasksHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<User?> Handle(GetUserByUsernameQuery request, CancellationToken cancellationToken)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == request.Username);

        if (user is not null)
        {
            await _context.Entry(user).Collection(u => u.Tasks).LoadAsync();
        }

        return user;

    }
}

public class GetUserByUsernameWithTasksQuery : IRequest<User?>
{
    public string Username { get; }

    public GetUserByUsernameWithTasksQuery(string username) => Username = username;
}
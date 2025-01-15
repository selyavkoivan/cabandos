using cabandos.Server.Data;
using MediatR;
using cabandos.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace cabandos.Server.Features.Users.Handlers;

public class SearchUsersByUsernameHandler : IRequestHandler<SearchUsersByUsernameQuery, List<User>>
{
    private ApplicationContext _context;

    public SearchUsersByUsernameHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<List<User>> Handle(GetUserByUsernameQuery request, CancellationToken cancellationToken)
    {
        return await _context.Users.Where(u => u.UserName.Contains(request.Username)).ToListAsync(cancellationToken); ;
    }
}

public class SearchUsersByUsernameQuery : IRequest<List<User>>
{
    public string Username { get; }

    public SearchUsersByUsernameQuery(string username) => Username = username;
}
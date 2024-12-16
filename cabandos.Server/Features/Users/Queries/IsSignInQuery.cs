using MediatR;
using System.Security.Claims;

namespace cabandos.Server.Features.Users.Queries;
public class IsSignInQuery : IRequest<bool> 
{
    public ClaimsPrincipal User { get; }

    public IsSignInQuery(ClaimsPrincipal user)
    {
        User = user;
    }
}
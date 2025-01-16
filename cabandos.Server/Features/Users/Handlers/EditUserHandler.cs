using cabandos.Server.Data;
using MediatR;
using cabandos.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using cabandos.Server.Domain.DTO;

namespace cabandos.Server.Features.Users.Handlers;

public class EditUserHandler : IRequestHandler<EditUserQuery>
{
    private ApplicationContext _context;
    private UserManager<User> _userManager;

    public EditUserHandler(ApplicationContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async System.Threading.Tasks.Task Handle(EditUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByNameAsync(request.Username);
        if (user is not null)
        {
            user.UpdateFromDTO(request.UserDTO);
            await _userManager.UpdateAsync(user);
        }
        return;
    }
}

public class EditUserQuery : IRequest
{
    public string Username { get; }
    public UserDTO UserDTO { get; }

    public EditUserQuery(string username, UserDTO userDTO)
    {
        Username = username;
        UserDTO = userDTO;
    }
}
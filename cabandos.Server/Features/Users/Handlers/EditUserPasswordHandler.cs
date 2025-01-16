using cabandos.Server.Data;
using MediatR;
using cabandos.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using cabandos.Server.Domain.DTO;

namespace cabandos.Server.Features.Users.Handlers;

public class EditUserPasswordHandler : IRequestHandler<EditUserPasswordQuery>
{
    private ApplicationContext _context;
    private UserManager<User> _userManager;

    public EditUserPasswordHandler(ApplicationContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async System.Threading.Tasks.Task Handle(EditUserPasswordQuery request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByNameAsync(request.Username);
        if (user is not null)
        {
            var result = await _userManager.ChangePasswordAsync(user, request.UserDTO.SignInPassword!, request.UserDTO.Password!);
            if (result.Succeeded) return;
            else throw new Exception(); // UserOperationException
        }
        return;
    }
}

public class EditUserPasswordQuery : IRequest
{
    public string Username { get; }
    public UserDTO UserDTO { get; }

    public EditUserPasswordQuery(string username, UserDTO userDTO)
    {
        Username = username;
        UserDTO = userDTO;
    }
}
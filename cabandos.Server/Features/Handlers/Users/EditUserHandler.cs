using cabandos.Server.Data;
using MediatR;
using cabandos.Server.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using cabandos.Server.Domain.DTO;
using Task = System.Threading.Tasks.Task;

namespace cabandos.Server.Features.Handlers.Users;

public class EditUserHandler : IRequestHandler<EditUserCommand>
{
    private ApplicationContext _context;
    private UserManager<User> _userManager;

    public EditUserHandler(ApplicationContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async Task Handle(EditUserCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByNameAsync(request.Username);
        if (user is not null)
        {
            user.UpdateFromDTO(request.UserDTO);
            user.UpdateEmail(request.UserDTO.Email, _userManager);

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return;
            else throw new Exception(result.Errors.First().Description);
        }
        return;
    }
}

public class EditUserCommand : IRequest
{
    public string Username { get; }
    public UserDTO UserDTO { get; }

    public EditUserCommand(string username, UserDTO userDTO)
    {
        Username = username;
        UserDTO = userDTO;
    }
}
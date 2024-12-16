using cabandos.Server.Models.DTO;
using MediatR;

namespace cabandos.Server.Features.Users.Commands;

public class SignUpCommand : IRequest<(bool Succeeded, string Error, string Description)>
{
    public UserDto UserDto { get; }

    public SignUpCommand(UserDto userDto)
    {
        UserDto = userDto;
    }
}
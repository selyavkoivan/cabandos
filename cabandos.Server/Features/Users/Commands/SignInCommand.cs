using cabandos.Server.Models.DTO;
using MediatR;

namespace cabandos.Server.Features.Users.Commands;

public class SignInCommand : IRequest<(bool Succeeded, string Error, string Description)>
{
    public UserDto UserDto { get; }

    public SignInCommand(UserDto userDto)
    {
        UserDto = userDto;
    }
}
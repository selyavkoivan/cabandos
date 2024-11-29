using cabandos.Server.Models.DTO;
using Microsoft.AspNetCore.Identity;

namespace cabandos.Server.Models;

public class User : IdentityUser
{
    public User(UserDto userDto)
    {
        UserName = userDto.Username;
        Email = userDto.Email;
    }

    public User()
    {
    }

    public void UpdateFromDto(UserDto userDto)
    {
        UserName = userDto.Username;
    }
}
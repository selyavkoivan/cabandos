using cabandos.Server.Domain.DTO;
using Microsoft.AspNetCore.Identity;

namespace cabandos.Server.Domain.Entities;

public class User : IdentityUser
{
    public User(UserDTO userDto)
    {
        UserName = userDto.Username;
        Email = userDto.Email;
    }

    public User()
    {
    }

    public void UpdateFromDTO(UserDTO userDto)
    {
        UserName = userDto.Username;
    }


    public ICollection<Task>? Tasks { get; set; } = new List<Task>();
}
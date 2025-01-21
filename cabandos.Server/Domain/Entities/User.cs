using cabandos.Server.Domain.DTO;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace cabandos.Server.Domain.Entities;

public class User : IdentityUser
{
    [StringLength(20, ErrorMessage = "Username cannot exceed 20 characters.")]
    public override string UserName { get; set; }

    [StringLength(30, ErrorMessage = "Email cannot exceed 30 characters.")]
    public override string Email { get; set; }

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
using cabandos.Server.Domain.DTO;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace cabandos.Server.Domain.Entities;

public class User : IdentityUser
{
    [StringLength(20, ErrorMessage = "Username cannot exceed 20 characters.")]
    public override string UserName { get; set; }

    
    [StringLength(50, ErrorMessage = "Email cannot exceed 50 characters.")]
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
        Email = userDto.Email;
    }

    public void UpdateEmail(string email, UserManager<User> manager)
    {
        Email = email;
        NormalizedEmail = manager.NormalizeEmail(email);
        EmailConfirmed = true;
    }

    public ICollection<Task>? Tasks { get; set; } = new List<Task>();
}
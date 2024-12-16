namespace cabandos.Server.Models.DTO;

public class UserDto
{
    public string? Email { get; set; }
    public string? Username { get; set; }

    private string? PasswordField;

    public string? Password
    {
        get
        {
            return PasswordField?.Equals(RepeatedPassword) == true ? PasswordField : null;
        }
        set => PasswordField = value;
    }

    public string? RepeatedPassword { get; set; }

    public string? SignInPassword { get; set; }

    public bool RememberMe { get; set; } = false;
}
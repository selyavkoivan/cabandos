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
            try
            {
                return PasswordField!.Equals(RepeatedPassword) ? PasswordField : null;
            }
            catch (NullReferenceException)
            {
                return string.Empty;
            }
        }
        set => PasswordField = value;
    }

    public string? RepeatedPassword { get; set; }

    public string? SignInPassword { get; set; }

    public bool RememberMe { get; set; } = false;
}
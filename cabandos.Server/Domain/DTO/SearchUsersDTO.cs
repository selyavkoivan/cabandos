namespace cabandos.Server.Domain.DTO;
public class SearchUsersDTO
{
    public string Username { get; set; } = string.Empty;
    public bool IncludeRoles { get; set; } = false;
    public bool IncludeTasks { get; set; } = false;
}


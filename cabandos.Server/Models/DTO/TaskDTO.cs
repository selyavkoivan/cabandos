using cabandos.Server.Models;

namespace cabandos.Server.Models.DTO;

public class TaskDTO
{
    public string Name { get; set; }
    public string? Description { get; set; }
    public TaskStatus Status { get; set; }
}
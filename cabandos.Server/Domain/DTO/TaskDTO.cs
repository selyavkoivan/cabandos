using cabandos.Server.Domain.Entities;

namespace cabandos.Server.Domain.DTO;

public class TaskDTO
{
    public string Name { get; set; }
    public string? Description { get; set; }
    public Entities.TaskStatus Status { get; set; }
}
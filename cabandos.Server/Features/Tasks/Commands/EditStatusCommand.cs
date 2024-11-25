using MediatR;

namespace cabandos.Server.Features.Tasks.Commands;

public class EditStatusCommand : IRequest
{
    public Guid TaskId { get; set; }
    public Server.Models.TaskStatus TaskStatus { get; set; }

    public EditStatusCommand(Guid taskId, Models.TaskStatus taskStatus)
    {
        TaskId = taskId;
        TaskStatus = taskStatus;
    }
}


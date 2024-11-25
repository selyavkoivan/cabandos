using MediatR;

namespace cabandos.Server.Features.Tasks.Commands;
public class DeleteTaskCommand : IRequest
{
    public Guid TaskId { get; set; }

    public DeleteTaskCommand(Guid taskId) => TaskId = taskId;
}
using cabandos.Server.Models.DTO;
using MediatR;

namespace cabandos.Server.Features.Tasks.Commands;

public class AddTaskCommand : IRequest<Models.Task>
{
    public TaskDTO TaskDTO { get; }

    public AddTaskCommand(TaskDTO taskDTO) => TaskDTO = taskDTO;
}
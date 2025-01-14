using cabandos.Server.Data;
using cabandos.Server.Domain.DTO;
using MediatR;

namespace cabandos.Server.Features.Tasks.Handlers;
using Task = Domain.Entities.Task;

public class AddTaskHandler : IRequestHandler<AddTaskCommand, Task>
{
    private ApplicationContext _context;

    public AddTaskHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<Task> Handle(AddTaskCommand request, CancellationToken cancellationToken)
    {
        var task = new Task(request.TaskDTO);

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync(cancellationToken);

        return task;
    }
}

public class AddTaskCommand : IRequest<Task>
{
    public TaskDTO TaskDTO { get; }

    public AddTaskCommand(TaskDTO taskDTO) => TaskDTO = taskDTO;
}
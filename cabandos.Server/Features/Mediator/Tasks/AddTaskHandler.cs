using cabandos.Server.Data;
using cabandos.Server.Models.DTO;
using MediatR;

namespace cabandos.Server.Features.Mediator.Tasks;

public class AddTaskHandler : IRequestHandler<AddTaskCommand, Models.Task>
{
    private ApplicationContext _context;

    public AddTaskHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<Models.Task> Handle(AddTaskCommand request, CancellationToken cancellationToken)
    {
        var task = new Models.Task(request.TaskDTO);

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync(cancellationToken);

        return task;
    }
}

public class AddTaskCommand : IRequest<Models.Task>
{
    public TaskDTO TaskDTO { get; }

    public AddTaskCommand(TaskDTO taskDTO) => TaskDTO = taskDTO;
}
using cabandos.Server.Data;
using cabandos.Server.Domain.DTO;
using MediatR;

namespace cabandos.Server.Features.Tasks.Handlers;

public class AddTaskHandler : IRequestHandler<AddTaskCommand, Domain.Entities.Task>
{
    private ApplicationContext _context;

    public AddTaskHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<Domain.Entities.Task> Handle(AddTaskCommand request, CancellationToken cancellationToken)
    {
        var task = new Domain.Task(request.TaskDTO);

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync(cancellationToken);

        return task;
    }
}

public class AddTaskCommand : IRequest<Domain.Entities.Task>
{
    public TaskDTO TaskDTO { get; }

    public AddTaskCommand(TaskDTO taskDTO) => TaskDTO = taskDTO;
}
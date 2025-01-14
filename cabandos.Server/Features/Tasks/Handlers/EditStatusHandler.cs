using MediatR;
using cabandos.Server.Data;
using cabandos.Server.Domain.Entities;

using Task = System.Threading.Tasks.Task;

namespace cabandos.Server.Features.Tasks.Handlers;

public class EditStatusHandler : IRequestHandler<EditStatusCommand>
{
    private ApplicationContext _context;

    public EditStatusHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task Handle(EditStatusCommand request, CancellationToken cancellationToken)
    {
        var task = _context.Tasks.Find(request.TaskId);

        task.Status = request.TaskStatus;

        await _context.SaveChangesAsync(cancellationToken);

        return;
    }
}

public class EditStatusCommand : IRequest
{
    public Guid TaskId { get; set; }
    public Domain.Entities.TaskStatus TaskStatus { get; set; }

    public EditStatusCommand(Guid taskId, Domain.Entities.TaskStatus taskStatus)
    {
        TaskId = taskId;
        TaskStatus = taskStatus;
    }
}
using MediatR;
using cabandos.Server.Data;

namespace cabandos.Server.Features.Mediator.Tasks;

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
    public Models.TaskStatus TaskStatus { get; set; }

    public EditStatusCommand(Guid taskId, Models.TaskStatus taskStatus)
    {
        TaskId = taskId;
        TaskStatus = taskStatus;
    }
}
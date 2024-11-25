using MediatR;
using cabandos.Server.Data;
using cabandos.Server.Features.Tasks.Commands;
using Task = System.Threading.Tasks.Task;

namespace cabandos.Server.Features.Tasks.Handlers;

public class EditStatusHandler : IRequestHandler<EditStatusCommand>
{
    public Task Handle(EditStatusCommand request, CancellationToken cancellationToken)
    {
        var task = DataContext.Tasks.First(t => t.Id == request.TaskId);
        task.Status = request.TaskStatus;

        return Task.CompletedTask;
    }
}
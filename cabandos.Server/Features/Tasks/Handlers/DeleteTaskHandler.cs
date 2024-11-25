using cabandos.Server.Data;
using cabandos.Server.Features.Tasks.Commands;
using MediatR;
using Task = System.Threading.Tasks.Task;

namespace cabandos.Server.Features.Tasks.Handlers;
public class DeleteTaskHandler : IRequestHandler<DeleteTaskCommand>
{
    public Task Handle(DeleteTaskCommand request, CancellationToken cancellationToken)
    {
        DataContext.Tasks.Remove(DataContext.Tasks.First(t => t.Id == request.TaskId));

        return Task.CompletedTask;
    }
}


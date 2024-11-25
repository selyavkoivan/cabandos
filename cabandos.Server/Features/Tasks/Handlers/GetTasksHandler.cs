using cabandos.Server.Features.Tasks.Queries;
using MediatR;
using Task = System.Threading.Tasks.Task;

namespace cabandos.Server.Features.Tasks.Handlers;

public class GetTasksHandler : IRequestHandler<GetTasksQuery, List<Models.Task>>
{
    public Task<List<Models.Task>> Handle(GetTasksQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(Data.DataContext.Tasks);
    }
}
using cabandos.Server.Data;
using cabandos.Server.Features.Tasks.Queries;
using MediatR;
using Task = System.Threading.Tasks.Task;

namespace cabandos.Server.Features.Tasks.Handlers;

public class GetTasksByStatusHandler : IRequestHandler<GetTasksByStatusQuery, List<object>>
{
    public Task<List<object>> Handle(GetTasksByStatusQuery request, CancellationToken cancellationToken)
    {
        var allStatuses = Enum.GetValues(typeof(Models.TaskStatus)).Cast<Models.TaskStatus>();

        var groupedTasks = allStatuses
            .Select(status => new
            {
                Status = status,
                Tasks = DataContext.Tasks.Where(t => t.Status == status).ToList()
            })
            .OrderBy(group => group.Status)
            .ToList<object>();

        return Task.FromResult(groupedTasks);
    }
}
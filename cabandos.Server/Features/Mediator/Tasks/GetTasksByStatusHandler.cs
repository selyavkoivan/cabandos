using cabandos.Server.Data;
using MediatR;

namespace cabandos.Server.Features.Mediator.Tasks;

public class GetTasksByStatusHandler : IRequestHandler<GetTasksByStatusQuery, List<object>>
{
    private ApplicationContext _context;

    public GetTasksByStatusHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<List<object>> Handle(GetTasksByStatusQuery request, CancellationToken cancellationToken)
    {
        var tasks = _context.Tasks.ToList();

        var groupedTasks = new List<object>
        {
            new
            {
                Status = "0",
                IsLeaf = false,
                Tasks = tasks.Where(task => (int)task.Status == 0)
                .GroupBy(task => task.Status)
                .Select(subGroup => new
                    {
                        Status = subGroup.Key.ToString(),
                        Tasks = subGroup.ToList(),
                        IsLeaf = true
                    })
                .ToList()
            },
            new
            {
                Status = "1-10",
                IsLeaf = false,
                Tasks = tasks.Where(task => (int)task.Status >= 1 && (int)task.Status <= 10)
                    .GroupBy(task => task.Status)
                    .Select(subGroup => new
                    {
                        Status = subGroup.Key.ToString(),
                        Tasks = subGroup.ToList(),
                        IsLeaf = true
                    })
                    .ToList()
            },
            new
            {
                Status = "11-20",
                IsLeaf = false,
                Tasks = tasks.Where(task => (int)task.Status >= 11)
                    .GroupBy(task => task.Status)
                    .Select(subGroup => new
                    {
                        Status = subGroup.Key.ToString(),
                        Tasks = subGroup.ToList(),
                        IsLeaf = true
                    })
                    .ToList()
            }
        };

        return groupedTasks;
    }
}

public class GetTasksByStatusQuery : IRequest<List<object>>
{
}
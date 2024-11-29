using cabandos.Server.Data;
using cabandos.Server.Features.Tasks.Queries;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Task = System.Threading.Tasks.Task;

namespace cabandos.Server.Features.Tasks.Handlers;

public class GetTasksHandler : IRequestHandler<GetTasksQuery, List<Models.Task>>
{
    private ApplicationContext _context;

    public GetTasksHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<List<Models.Task>> Handle(GetTasksQuery request, CancellationToken cancellationToken)
    {
        return await _context.Tasks.ToListAsync();
    }
}
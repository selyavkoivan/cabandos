using cabandos.Server.Data;
using cabandos.Server.Features.Tasks.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc.Formatters;
using Task = System.Threading.Tasks.Task;

namespace cabandos.Server.Features.Tasks.Handlers;

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


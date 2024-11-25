using cabandos.Server.Data;
using cabandos.Server.Features.Tasks.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc.Formatters;
using Task = System.Threading.Tasks.Task;

namespace cabandos.Server.Features.Tasks.Handlers;

public class AddTaskHandler : IRequestHandler<AddTaskCommand, Models.Task>
{
    public Task<Models.Task> Handle(AddTaskCommand request, CancellationToken cancellationToken)
    {
        var task = new Models.Task(request.TaskDTO);
        DataContext.Tasks.Add(task);
        return Task.FromResult(task);
    }
}


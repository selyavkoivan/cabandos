﻿using cabandos.Server.Data;
using MediatR;

namespace cabandos.Server.Features.Handlers.Tasks;
public class DeleteTaskHandler : IRequestHandler<DeleteTaskCommand>
{
    private ApplicationContext _context;

    public DeleteTaskHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task Handle(DeleteTaskCommand request, CancellationToken cancellationToken)
    {
        var task = _context.Tasks.Find(request.TaskId);

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync(cancellationToken);

        return;
    }
}

public class DeleteTaskCommand : IRequest
{
    public Guid TaskId { get; set; }

    public DeleteTaskCommand(Guid taskId) => TaskId = taskId;
}
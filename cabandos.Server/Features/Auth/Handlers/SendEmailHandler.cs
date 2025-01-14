using MediatR;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace cabandos.Server.Features.Auth.Handlers;

public class SendEmailCommandHandler : IRequestHandler<SendEmailCommand, bool>
{
    private readonly IEmailSender _emailSender;

    public SendEmailCommandHandler(IEmailSender emailSender)
    {
        _emailSender = emailSender;
    }

    public async Task<bool> Handle(SendEmailCommand request, CancellationToken cancellationToken)
    {
        try
        {
            await _emailSender.SendEmailAsync(request.To, request.Subject, request.Body);
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }
}

public class SendEmailCommand : IRequest<bool>
{
    public string To { get; }
    public string Subject { get; }
    public string Body { get; }

    public SendEmailCommand(string to, string subject, string body)
    {
        To = to;
        Subject = subject;
        Body = body;
    }
}
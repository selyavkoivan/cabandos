using cabandos.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Filters;
using Task = System.Threading.Tasks.Task;

namespace cabandos.Server.Features.Attributes.Filter;

public class EmailConfirmedFilter : IAsyncActionFilter
{
    private readonly UserManager<User> _userManager;
    private readonly ILogger<EmailConfirmedFilter> _logger;

    public EmailConfirmedFilter(UserManager<User> userManager, ILogger<EmailConfirmedFilter> logger)
    {
        _userManager = userManager;
        _logger = logger;
    }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var hasEmailConfirmedAttribute = context.ActionDescriptor.EndpointMetadata
            .OfType<EmailConfirmedAttribute>()
            .Any();

        if (hasEmailConfirmedAttribute)
        {
            var user = context.HttpContext.User;

            if (user?.Identity?.IsAuthenticated == true)
            {
                var applicationUser = await _userManager.GetUserAsync(user);

                if (applicationUser != null)
                {
                    if (!applicationUser.EmailConfirmed)
                    {
                        _logger.LogWarning($"User {user.Identity.Name} attempted to access a resource with unconfirmed email.");

                        context.Result = new Microsoft.AspNetCore.Mvc.ForbidResult();
                        return;
                    }
                }
                else
                {
                    _logger.LogWarning("User not found.");
                }
            }
        }

        await next();
    }
}
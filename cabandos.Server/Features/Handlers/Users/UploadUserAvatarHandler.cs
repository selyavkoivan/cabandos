using cabandos.Server.Data;
using MediatR;
using cabandos.Server.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using cabandos.Server.Domain.DTO;
using cabandos.Server.Migrations;
using cabandos.Server.Features.Services;

namespace cabandos.Server.Features.Handlers.Users;

public class UploadUserAvatarHandler : IRequestHandler<UploadUserAvatarCommand>
{
    private ApplicationContext _context;
    private UserManager<User> _userManager;

    public UploadUserAvatarHandler(ApplicationContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async System.Threading.Tasks.Task Handle(UploadUserAvatarCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByNameAsync(request.Username);
        if (user is not null)
        {
            var uploadResult = await CloudinaryUploader.UploadAsync(request.File);

            user.AvatarUrl = uploadResult.Url.AbsoluteUri;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return;
            else throw new Exception(result.Errors.First().Description);
        }
        return;
    }
}

public class UploadUserAvatarCommand : IRequest
{
    public string Username { get; }
    public IFormFile File { get; }

    public UploadUserAvatarCommand(string username, IFormFile file)
    {
        Username = username;
        File = file;
    }
}
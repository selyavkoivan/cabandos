using cabandos.Server.Features.Exceptions;
using cabandos.Server.Domain.DTO;
using MediatR;
using Microsoft.AspNetCore.Identity;
using cabandos.Server.Domain.Entities;

namespace cabandos.Server.Features.Handlers.Auth
{
    public class SignUpHandler : IRequestHandler<SignUpCommand, IdentityResult>
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public SignUpHandler(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<IdentityResult> Handle(SignUpCommand request, CancellationToken cancellationToken)
        {
            var user = new User(request.UserDto);
            var result = await _userManager.CreateAsync(user, request.UserDto.Password!);

            if (result.Succeeded)
            {
                var roleExists = await _roleManager.RoleExistsAsync("User");
                if (!roleExists)
                {
                    var roleCreationResult = await _roleManager.CreateAsync(new IdentityRole("User"));
                    if (!roleCreationResult.Succeeded)
                    {
                        throw new AuthException("RoleCreationFailed", roleCreationResult);
                    }
                }

                var addRoleResult = await _userManager.AddToRoleAsync(user, "User");
                if (!addRoleResult.Succeeded)
                {
                    throw new AuthException("AddRoleFailed", addRoleResult);
                }

                return result;
            }

            throw new AuthException("SignUpFailed", result);
        }
    }

    public class SignUpCommand : IRequest<IdentityResult>
    {
        public UserDTO UserDto { get; }

        public SignUpCommand(UserDTO userDto)
        {
            UserDto = userDto;
        }
    }
}

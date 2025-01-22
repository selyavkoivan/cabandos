using Microsoft.AspNetCore.Identity;

namespace cabandos.Server.Features.Exceptions;
public class AuthException : Exception
{
    public string ErrorCode { get; }

    public AuthException(string errorCode, string message)
        : base(message)
    {
        ErrorCode = errorCode;
    }

    public AuthException(string errorCode, IdentityResult result)
        : base(GetExceptionMessage(result))
    {
        ErrorCode = errorCode;
    }

    public AuthException(string errorCode, SignInResult result)
        : base(GetExceptionMessage(result))
    {
        ErrorCode = errorCode;
    }

    private static string GetExceptionMessage(IdentityResult result)
    {
        if (result.Errors == null || !result.Errors.Any())
            return "Unknown error occurred during user registration.";

        return string.Join("; ", result.Errors.Select(e => e.Description));
    }

    private static string GetExceptionMessage(SignInResult result)
    {
        //if (result. == null || !result.Errors.Any())
        return "Unknown error occurred during user registration.";

        // return string.Join("; ", result.Errors.Select(e => e.Description));
    }
}

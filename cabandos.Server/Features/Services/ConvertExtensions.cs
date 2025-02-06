using cabandos.Server.Domain.Entities;
using TaskStatus = cabandos.Server.Domain.Entities.TaskStatus;

namespace cabandos.Server.Features.Services;

public static class ConvertExtensions
{
    public static string GetStatusName(this TaskStatus status)
    {
        return status switch
        {
            TaskStatus.NotStarted => "Not Started",
            TaskStatus.InProgress => "In Progress",
            TaskStatus.Completed => "Completed",
            TaskStatus.Canceled => "Canceled",
            _ => status.ToString()
        };
    }

    public static string ConvertValueToString(this object value)
    {
        if (value is null || string.IsNullOrEmpty(value as string))
        {
            return "No Data";
        }

        if (value is TaskStatus status)
        {
            return status.GetStatusName();
        }


        if (value is IConvertible)
        {
            try
            {
                return Convert.ToString(value);
            }
            catch
            {
                return value.ToString();
            }
        }

        return value.ToString();
    }
}


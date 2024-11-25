using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

using SystemTask = System.Threading.Tasks.Task;

using Task = cabandos.Server.Models.Task;
using TaskStatus = cabandos.Server.Models.TaskStatus;
using System.Threading.Tasks;
using cabandos.Server.Controllers.TaskController;
using MediatR;
using cabandos.Server.Controllers.TaskController.DTO;
using cabandos.Server.Controllers.TaskController.Commands;
using System.Reflection.Metadata;
using System.Reflection;

namespace cabandos.Tests.Tests;

public class TaskControllerTests
{
   // in future updates
}
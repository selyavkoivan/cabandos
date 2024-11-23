using cabandos.Server.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;
using cabandos.Server.Models;

using cabandos.Server.Models.DTO;

using Task = cabandos.Server.Models.Task;
using TaskStatus = cabandos.Server.Models.TaskStatus;
using System.Threading.Tasks;

namespace cabandos.Tests.Tests;
public class TaskControllerTests
{
    private static Mock<ILogger<TaskController>> _logger = new();

    private readonly TaskController controller;

    public TaskControllerTests()
    {
        controller = new TaskController(_logger.Object);
    }

    [Fact]
    public void AddTaskTest()
    {

        var tasks = controller.GetTasks().ToArray();
        var tasksCount = tasks.Count();

        var taskDTO = new TaskDTO { Name = "6", Status = TaskStatus.NotStarted };

        var task = controller.AddTask(taskDTO);

        var newTasks = controller.GetTasks();
        var newTasksCount = tasks.Count();

        var exceptedTasts = newTasks.Except(tasks);

        Assert.Single(exceptedTasts);
        Assert.Equal(exceptedTasts.First(), task);
    }

    [Fact]
    public void EditTaskStatusTest()
    {

        var taskDTO = new TaskDTO { Name = "6", Status = TaskStatus.NotStarted };
        var task = controller.AddTask(taskDTO);

        var newTask = new Task { Id = task.Id, Name = task.Name, Status = TaskStatus.Completed };

        newTask.Status = TaskStatus.Completed;

        Assert.NotEqual(task.Status, newTask.Status);

        var tasks = controller.GetTasks();
        Assert.NotEqual(newTask.Status, tasks.Last().Status);

        controller.EditTaskStatus(newTask);

        Assert.Equal(newTask.Status, tasks.Last().Status);
    }

    [Fact]
    public void DeleteTaskTest()
    {
        var count = controller.GetTasks().Count();

        var taskDTO = new TaskDTO { Name = "6", Status = TaskStatus.NotStarted };
        var task = controller.AddTask(taskDTO);

        var newCount = controller.GetTasks().Count();

        Assert.Equal(count + 1, newCount);

        controller.DeleteTask(task);

        var countAfterDelete = controller.GetTasks().Count;

        Assert.Equal(count, countAfterDelete);
    }
}
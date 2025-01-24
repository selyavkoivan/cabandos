using cabandos.Server.Data;
using cabandos.Server.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using cabandos.Server.Domain.Entities;
using cabandos.Server.Features.Configurations;
using cabandos.Server.Features.Attributes.Filter;

var builder = WebApplication.CreateBuilder(args);

var emailConfig = builder.Configuration
    .GetSection("EmailConfiguration")
    .Get<EmailConfiguration>();

builder.Services.Configure<EmailConfiguration>(builder.Configuration.GetSection("EmailConfiguration"));
builder.Services.AddTransient<IEmailSender, EmailSender>();


builder.Services.AddScoped<EmailConfirmedFilter>(); 

builder.Services.AddControllers(options =>
{
    options.Filters.AddService<EmailConfirmedFilter>();
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<User, IdentityRole>(o =>
{
    o.SignIn.RequireConfirmedPhoneNumber = false;
    o.SignIn.RequireConfirmedEmail = false;
    o.Lockout.AllowedForNewUsers = true;
    o.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
    o.Lockout.MaxFailedAccessAttempts = 3;
}).AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationContext>()
    .AddDefaultTokenProviders();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

var app = builder.Build();
app.UseWebSockets();
app.UseMiddleware<GlobalExceptionMiddleware>();
app.UseMiddleware<RequestLoggingMiddleware>();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

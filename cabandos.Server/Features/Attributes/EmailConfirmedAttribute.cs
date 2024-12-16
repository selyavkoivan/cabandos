namespace cabandos.Server.Features.Attributes;

[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, Inherited = true)]
public class EmailConfirmedAttribute : Attribute
{
}
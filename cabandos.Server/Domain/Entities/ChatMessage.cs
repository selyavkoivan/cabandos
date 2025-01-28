using System.Text.Json.Serialization;

namespace cabandos.Server.Domain.Entities;

public class ChatMessage
{
    public Guid Id { get; set; }
    public string? ChatRoomId { get; set; }

    public string Message { get; set; }
    public DateTime SentAt { get; set; }

    public string? FromUserId { get; set; }
    
    [JsonIgnore]
    public User? FromUser { get; set; }

    public string? ToUserId { get; set; }
    [JsonIgnore]
    public User? ToUser { get; set; }
}
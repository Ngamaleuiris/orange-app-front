using System.Text.Json.Serialization;

namespace AccessTransmitAPI.Models
{
    public class CreateUserRequest
    {
        [JsonPropertyName("username")]
        public required string Username { get; set; }

        [JsonPropertyName("email")]
        public required string Email { get; set; }

        [JsonPropertyName("firstName")]
        public string? FirstName { get; set; }

        [JsonPropertyName("lastName")]
        public string? LastName { get; set; }

        [JsonPropertyName("enabled")]
        public bool Enabled { get; set; } = true;

        [JsonPropertyName("credentials")]
        public List<Credential>? Credentials { get; set; }
    }

    public class Credential
    {
        [JsonPropertyName("type")]
        public string Type { get; set; } = "password";

        [JsonPropertyName("value")]
        public required string Value { get; set; }

        [JsonPropertyName("temporary")]
        public bool Temporary { get; set; } = false;
    }
} 
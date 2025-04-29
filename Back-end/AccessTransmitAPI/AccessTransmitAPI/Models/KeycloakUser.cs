using System.Text.Json.Serialization;

namespace AccessTransmitAPI.Models
{
    public class KeycloakUser
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("username")]
        public string Username { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("enabled")]
        public bool? Enabled { get; set; }

        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }

        [JsonPropertyName("lastName")]
        public string LastName { get; set; }
    }

    public class CredentialRequest
    {
        [JsonPropertyName("type")]
        public string Type { get; set; } = "password";

        [JsonPropertyName("value")]
        public string Value { get; set; }

        [JsonPropertyName("temporary")]
        public bool Temporary { get; set; } = false;
    }

    public class CreateUserRequest
    {
        [JsonPropertyName("username")]
        public string Username { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("enabled")]
        public bool Enabled { get; set; } = true;

        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }

        [JsonPropertyName("lastName")]
        public string LastName { get; set; }

        [JsonPropertyName("credentials")]
        public List<CredentialRequest> Credentials { get; set; }
    }

    public class UpdateUserRequest
    {
        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }

        [JsonPropertyName("lastName")]
        public string LastName { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("enabled")]
        public bool Enabled { get; set; }
    }

    // 🆕 Nouveau modèle pour ResetPassword
    public class ResetPasswordRequest
    {
        [JsonPropertyName("newPassword")]
        public string NewPassword { get; set; }
    }
}

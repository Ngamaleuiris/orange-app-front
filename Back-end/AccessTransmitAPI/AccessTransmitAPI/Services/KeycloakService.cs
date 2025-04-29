using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;
using Microsoft.Extensions.Options;
using AccessTransmitAPI.Configuration;
using AccessTransmitAPI.Models;

namespace AccessTransmitAPI.Services
{
    public class KeycloakService
    {
        private readonly HttpClient _httpClient;
        private readonly KeycloakOptions _options;

        public KeycloakService(HttpClient httpClient, IOptions<KeycloakOptions> options)
        {
            _httpClient = httpClient;
            _options = options.Value;
        }

        public async Task<string?> GetAccessTokenAsync()
        {
            var request = new HttpRequestMessage(HttpMethod.Post, $"{_options.BaseUrl}/realms/{_options.Realm}/protocol/openid-connect/token");

            var parameters = new Dictionary<string, string>
            {
                {"grant_type", "password"},
                {"client_id", "admin-cli"},
                {"username", _options.AdminUsername},
                {"password", _options.AdminPassword}
            };

            request.Content = new FormUrlEncodedContent(parameters);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var response = await _httpClient.SendAsync(request);
            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Error retrieving token: {error}");
                return null;
            }

            var content = await response.Content.ReadAsStringAsync();
            var json = JsonDocument.Parse(content);
            return json.RootElement.GetProperty("access_token").GetString();
        }

        public async Task<List<KeycloakUser>?> GetUsersAsync()
        {
            var token = await GetAccessTokenAsync();
            if (token == null) return null;

            var request = new HttpRequestMessage(HttpMethod.Get, $"{_options.BaseUrl}/admin/realms/{_options.Realm}/users");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.SendAsync(request);
            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Error retrieving users: {error}");
                return null;
            }

            var content = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<KeycloakUser>>(content);
        }

        public async Task<KeycloakUser> GetUserByUsernameAsync(string username)
        {
            var token = await GetAccessTokenAsync();
            if (token == null) return null;

            var request = new HttpRequestMessage(HttpMethod.Get, 
                $"{_options.BaseUrl}/admin/realms/{_options.Realm}/users?username={Uri.EscapeDataString(username)}");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.SendAsync(request);
            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Error retrieving user: {error}");
                return null;
            }

            var content = await response.Content.ReadAsStringAsync();
            var users = JsonSerializer.Deserialize<List<KeycloakUser>>(content);
            return users?.FirstOrDefault();
        }

        public async Task<string> CreateUserAsync(CreateUserRequest request)
        {
            var token = await GetAccessTokenAsync();
            if (token == null) throw new Exception("Échec de l'obtention du token d'accès");

            var httpRequest = new HttpRequestMessage(HttpMethod.Post, 
                $"{_options.BaseUrl}/admin/realms/{_options.Realm}/users");
            
            httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            
            var userData = new
            {
                username = request.Username,
                email = request.Email,
                firstName = request.FirstName,
                lastName = request.LastName,
                enabled = request.Enabled,
                credentials = request.Credentials
            };

            httpRequest.Content = new StringContent(
                JsonSerializer.Serialize(userData), 
                Encoding.UTF8, 
                "application/json");

            var response = await _httpClient.SendAsync(httpRequest);
            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Erreur Keycloak lors de la création de l'utilisateur: {error}");
                throw new Exception($"Échec de la création de l'utilisateur dans Keycloak: {error}");
            }

            // Récupérer l'ID de l'utilisateur créé depuis le header Location
            var locationHeader = response.Headers.Location?.ToString();
            if (string.IsNullOrEmpty(locationHeader))
            {
                throw new Exception("Impossible de récupérer l'ID de l'utilisateur créé");
            }

            return locationHeader.Split('/').Last();
        }

        public async Task UpdateUserAsync(string userId, UpdateUserRequest request)
        {
            var token = await GetAccessTokenAsync();
            if (token == null) throw new Exception("Échec de l'obtention du token d'accès");

            var httpRequest = new HttpRequestMessage(HttpMethod.Put, 
                $"{_options.BaseUrl}/admin/realms/{_options.Realm}/users/{userId}");
            
            httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            
            var updateData = new
            {
                username = request.Username,
                email = request.Email,
                enabled = request.Enabled,
                firstName = request.FirstName,
                lastName = request.LastName
            };

            httpRequest.Content = new StringContent(
                JsonSerializer.Serialize(updateData), 
                Encoding.UTF8, 
                "application/json");

            var response = await _httpClient.SendAsync(httpRequest);
            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Erreur Keycloak: {error}");
                throw new Exception($"Échec de la mise à jour de l'utilisateur dans Keycloak: {error}");
            }
        }

        public async Task DisableUserAsync(string userId)
        {
            var token = await GetAccessTokenAsync();
            if (token == null) throw new Exception("Failed to get access token");

            var updateData = new { enabled = false };
            
            var request = new HttpRequestMessage(HttpMethod.Put, 
                $"{_options.BaseUrl}/admin/realms/{_options.Realm}/users/{userId}");
            
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            request.Content = new StringContent(JsonSerializer.Serialize(updateData), Encoding.UTF8, "application/json");

            var response = await _httpClient.SendAsync(request);
            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new Exception($"Failed to disable user: {error}");
            }
        }

        public async Task DeleteUserAsync(string userId)
        {
            var token = await GetAccessTokenAsync();
            if (token == null) throw new Exception("Échec de l'obtention du token d'accès");

            var httpRequest = new HttpRequestMessage(HttpMethod.Delete, 
                $"{_options.BaseUrl}/admin/realms/{_options.Realm}/users/{userId}");

            httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.SendAsync(httpRequest);
            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Erreur Keycloak lors de la suppression de l'utilisateur: {error}");
                throw new Exception($"Échec de la suppression de l'utilisateur dans Keycloak: {error}");
            }
        }

        // 🆕 Ajout : Reset password
        public async Task ResetPasswordAsync(string userId, ResetPasswordRequest request)
        {
            var token = await GetAccessTokenAsync();
            if (token == null) throw new Exception("Échec de l'obtention du token d'accès");

            var payload = new
            {
                type = "password",
                value = request.NewPassword,
                temporary = false
            };

            var httpRequest = new HttpRequestMessage(HttpMethod.Put, 
                $"{_options.BaseUrl}/admin/realms/{_options.Realm}/users/{userId}/reset-password");

            httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            httpRequest.Content = new StringContent(
                JsonSerializer.Serialize(payload), 
                Encoding.UTF8, 
                "application/json");

            var response = await _httpClient.SendAsync(httpRequest);
            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Erreur Keycloak lors de la réinitialisation du mot de passe: {error}");
                throw new Exception($"Échec de la réinitialisation du mot de passe dans Keycloak: {error}");
            }
        }
    }
}

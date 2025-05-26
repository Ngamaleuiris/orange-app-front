using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;
using Microsoft.Extensions.Options;
using AccessTransmitAPI.Configuration;
using AccessTransmitAPI.Models;
using Microsoft.Extensions.Logging;

namespace AccessTransmitAPI.Services
{
    public class KeycloakService
    {
        private readonly HttpClient _httpClient;
        private readonly KeycloakOptions _options;
        private string? _cachedToken;
        private DateTime _tokenExpiration;
        private readonly ILogger<KeycloakService> _logger;

        public KeycloakService(HttpClient httpClient, IOptions<KeycloakOptions> options, ILogger<KeycloakService> logger)
        {
            _httpClient = httpClient;
            _options = options.Value;
            _tokenExpiration = DateTime.MinValue;
            _logger = logger;
        }

        private bool IsTokenValid()
        {
            return !string.IsNullOrEmpty(_cachedToken) && DateTime.UtcNow < _tokenExpiration;
        }

        private async Task EnsureValidTokenAsync()
        {
            if (!IsTokenValid())
            {
                _logger.LogInformation("Token invalide ou expiré, obtention d'un nouveau token");
                var token = await GetAccessTokenAsync();
                if (token == null)
                {
                    throw new Exception("Impossible d'obtenir un token d'accès valide pour Keycloak");
                }
            }
        }

        public async Task<string?> GetAccessTokenAsync()
        {
            try
            {
                // Vérifier si le token en cache est toujours valide
                if (IsTokenValid())
                {
                    Console.WriteLine("Utilisation du token en cache");
                    return _cachedToken;
                }

                Console.WriteLine($"Tentative d'obtention du token d'accès pour {_options.AdminUsername} sur {_options.BaseUrl}");
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

                Console.WriteLine("Envoi de la requête pour obtenir le token...");
                var response = await _httpClient.SendAsync(request);
                
                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Erreur lors de l'obtention du token: {error}");
                    Console.WriteLine($"Status Code: {response.StatusCode}");
                    return null;
                }

                var content = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Token obtenu avec succès");
                var json = JsonDocument.Parse(content);
                
                // Mettre en cache le token et sa date d'expiration
                _cachedToken = json.RootElement.GetProperty("access_token").GetString();
                var expiresIn = json.RootElement.GetProperty("expires_in").GetInt32();
                _tokenExpiration = DateTime.UtcNow.AddSeconds(expiresIn - 30); // 30 secondes de marge

                return _cachedToken;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception lors de l'obtention du token: {ex.Message}");
                Console.WriteLine($"StackTrace: {ex.StackTrace}");
                return null;
            }
        }

        public async Task<List<KeycloakUser>?> GetUsersAsync()
        {
            try
            {
                await EnsureValidTokenAsync();
                _logger.LogInformation("Récupération des utilisateurs depuis Keycloak");

                var request = new HttpRequestMessage(HttpMethod.Get, $"{_options.BaseUrl}/admin/realms/{_options.Realm}/users");
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _cachedToken);

                var response = await _httpClient.SendAsync(request);
                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    _logger.LogError($"Erreur Keycloak: {error}");
                    throw new Exception($"Erreur lors de la récupération des utilisateurs: {error}");
                }

                var content = await response.Content.ReadAsStringAsync();
                var users = JsonSerializer.Deserialize<List<KeycloakUser>>(content);
                _logger.LogInformation($"Nombre d'utilisateurs récupérés: {users?.Count ?? 0}");
                return users ?? new List<KeycloakUser>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de la récupération des utilisateurs");
                throw;
            }
        }

        public async Task<KeycloakUser?> GetUserByUsernameAsync(string username)
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
            try
            {
                await EnsureValidTokenAsync();
                _logger.LogInformation($"Création d'un nouvel utilisateur: {request.Username}");

                var httpRequest = new HttpRequestMessage(HttpMethod.Post, 
                    $"{_options.BaseUrl}/admin/realms/{_options.Realm}/users");
                
                httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _cachedToken);
                
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
                    _logger.LogError($"Erreur lors de la création de l'utilisateur: {error}");
                    throw new Exception($"Échec de la création de l'utilisateur dans Keycloak: {error}");
                }

                var locationHeader = response.Headers.Location?.ToString();
                if (string.IsNullOrEmpty(locationHeader))
                {
                    throw new Exception("Impossible de récupérer l'ID de l'utilisateur créé");
                }

                var userId = locationHeader.Split('/').Last();
                _logger.LogInformation($"Utilisateur créé avec succès. ID: {userId}");
                return userId;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de la création de l'utilisateur");
                throw;
            }
        }

        public async Task UpdateUserAsync(string userId, UpdateUserRequest request)
        {
            try
            {
                await EnsureValidTokenAsync();
                _logger.LogInformation($"Mise à jour de l'utilisateur {userId}");

                var httpRequest = new HttpRequestMessage(HttpMethod.Put, 
                    $"{_options.BaseUrl}/admin/realms/{_options.Realm}/users/{userId}");
                
                httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _cachedToken);
                
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
                    _logger.LogError($"Erreur lors de la mise à jour de l'utilisateur: {error}");
                    throw new Exception($"Échec de la mise à jour de l'utilisateur dans Keycloak: {error}");
                }

                _logger.LogInformation($"Utilisateur {userId} mis à jour avec succès");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erreur lors de la mise à jour de l'utilisateur {userId}");
                throw;
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

        public async Task<List<KeycloakRole>?> GetRolesAsync()
        {
            try
            {
                Console.WriteLine("Tentative de récupération des rôles...");
                var token = await GetAccessTokenAsync();
                if (token == null)
                {
                    Console.WriteLine("Impossible d'obtenir le token d'accès");
                    return null;
                }

                var request = new HttpRequestMessage(HttpMethod.Get, 
                    $"{_options.BaseUrl}/admin/realms/{_options.Realm}/roles");
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await _httpClient.SendAsync(request);
                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Erreur lors de la récupération des rôles: {error}");
                    return null;
                }

                var content = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<List<KeycloakRole>>(content);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception lors de la récupération des rôles: {ex.Message}");
                return null;
            }
        }

        public async Task<List<UserRoleMapping>?> GetUsersWithRolesAsync()
        {
            try
            {
                Console.WriteLine("Tentative de récupération des utilisateurs avec leurs rôles...");
                var token = await GetAccessTokenAsync();
                if (token == null)
                {
                    Console.WriteLine("Impossible d'obtenir le token d'accès");
                    return null;
                }

                var users = await GetUsersAsync();
                if (users == null)
                {
                    Console.WriteLine("Impossible de récupérer les utilisateurs");
                    return null;
                }

                var userRoleMappings = new List<UserRoleMapping>();

                foreach (var user in users)
                {
                    var request = new HttpRequestMessage(HttpMethod.Get, 
                        $"{_options.BaseUrl}/admin/realms/{_options.Realm}/users/{user.Id}/role-mappings/realm");
                    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

                    var response = await _httpClient.SendAsync(request);
                    if (response.IsSuccessStatusCode)
                    {
                        var content = await response.Content.ReadAsStringAsync();
                        var roles = JsonSerializer.Deserialize<List<KeycloakRole>>(content);

                        userRoleMappings.Add(new UserRoleMapping
                        {
                            UserId = user.Id,
                            Username = user.Username,
                            Roles = roles
                        });
                    }
                }

                return userRoleMappings;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception lors de la récupération des utilisateurs avec leurs rôles: {ex.Message}");
                return null;
            }
        }

        public async Task<bool> AssignRoleToUserAsync(string userId, string roleName)
        {
            try
            {
                var token = await GetAccessTokenAsync();
                if (token == null) return false;

                var roles = await GetRolesAsync();
                var role = roles?.FirstOrDefault(r => r.Name == roleName);
                if (role == null) return false;

                var request = new HttpRequestMessage(HttpMethod.Post, 
                    $"{_options.BaseUrl}/admin/realms/{_options.Realm}/users/{userId}/role-mappings/realm");
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
                request.Content = new StringContent(
                    JsonSerializer.Serialize(new[] { role }),
                    Encoding.UTF8,
                    "application/json");

                var response = await _httpClient.SendAsync(request);
                return response.IsSuccessStatusCode;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception lors de l'assignation du rôle: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> RemoveRoleFromUserAsync(string userId, string roleName)
        {
            try
            {
                var token = await GetAccessTokenAsync();
                if (token == null) return false;

                var roles = await GetRolesAsync();
                var role = roles?.FirstOrDefault(r => r.Name == roleName);
                if (role == null) return false;

                var request = new HttpRequestMessage(HttpMethod.Delete, 
                    $"{_options.BaseUrl}/admin/realms/{_options.Realm}/users/{userId}/role-mappings/realm");
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
                request.Content = new StringContent(
                    JsonSerializer.Serialize(new[] { role }),
                    Encoding.UTF8,
                    "application/json");

                var response = await _httpClient.SendAsync(request);
                return response.IsSuccessStatusCode;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception lors de la suppression du rôle: {ex.Message}");
                return false;
            }
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using AccessTransmitAPI.Models;
using AccessTransmitAPI.Services;

namespace AccessTransmitAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly KeycloakService _keycloakService;

        public UsersController(KeycloakService keycloakService)
        {
            _keycloakService = keycloakService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var keycloakUsers = await _keycloakService.GetUsersAsync();
                if (keycloakUsers == null)
                    return StatusCode(500, "Failed to retrieve users.");

                // Transformation des utilisateurs Keycloak en modèle de réponse
                var users = keycloakUsers.Select(u => new UserResponse
                {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                    Enabled = u.Enabled ?? false,
                    // Vous devrez peut-être ajouter une méthode pour récupérer les groupes
                    // Groups = await _keycloakService.GetUserGroupsAsync(u.Id)
                }).ToList();

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("byUsername/{username}")]
        public async Task<IActionResult> GetUserIdByUsername(string username)
        {
            var user = await _keycloakService.GetUserByUsernameAsync(username);
            if (user == null)
                return StatusCode(500, $"Failed to retrieve user with username: {username}");

            return Ok(new { userId = user.Id, username = user.Username });
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest("Les données de l'utilisateur sont requises");
                }

                if (string.IsNullOrEmpty(request.Username))
                {
                    return BadRequest("Le nom d'utilisateur est requis");
                }

                if (string.IsNullOrEmpty(request.Email))
                {
                    return BadRequest("L'email est requis");
                }

                if (request.Credentials == null || !request.Credentials.Any())
                {
                    return BadRequest("Le mot de passe est requis");
                }

                var result = await _keycloakService.CreateUserAsync(request);
                if (result == null)
                {
                    return StatusCode(500, new { message = "Échec de la création de l'utilisateur" });
                }

                return Ok(new { userId = result, message = "Utilisateur créé avec succès" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erreur lors de la création de l'utilisateur: {ex.Message}");
                return StatusCode(500, new { message = $"Erreur lors de la création de l'utilisateur: {ex.Message}" });
            }
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUser(string userId, [FromBody] UpdateUserRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest("L'ID de l'utilisateur est requis");
                }

                if (request == null)
                {
                    return BadRequest("Les données de mise à jour sont requises");
                }

                await _keycloakService.UpdateUserAsync(userId, request);
                return Ok(new { message = "Utilisateur mis à jour avec succès" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erreur lors de la mise à jour de l'utilisateur: {ex.Message}");
                return StatusCode(500, new { message = $"Erreur lors de la mise à jour de l'utilisateur: {ex.Message}" });
            }
        }

        [HttpPut("{userId}/disable")]
        public async Task<IActionResult> DisableUser(string userId)
        {
            try
            {
                await _keycloakService.DisableUserAsync(userId);
                return Ok(new { message = "User access suspended successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to suspend user access: {ex.Message}");
            }
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            try
            {
                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest("L'ID de l'utilisateur est requis");
                }

                await _keycloakService.DeleteUserAsync(userId);
                return Ok(new { message = "Utilisateur supprimé avec succès" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erreur lors de la suppression de l'utilisateur: {ex.Message}");
                return StatusCode(500, new { message = $"Erreur lors de la suppression de l'utilisateur: {ex.Message}" });
            }
        }

        // 🆕 Ajout : Reset Password
        [HttpPost("{userId}/reset-password")]
        public async Task<IActionResult> ResetPassword(string userId, [FromBody] ResetPasswordRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest("L'ID de l'utilisateur est requis");
                }

                if (request == null || string.IsNullOrEmpty(request.NewPassword))
                {
                    return BadRequest("Le nouveau mot de passe est requis");
                }

                await _keycloakService.ResetPasswordAsync(userId, request);
                return Ok(new { message = "Mot de passe modifié avec succès" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erreur lors de la modification du mot de passe: {ex.Message}");
                return StatusCode(500, new { message = $"Erreur lors de la modification du mot de passe: {ex.Message}" });
            }
        }
    }

    public class UserResponse
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public bool Enabled { get; set; }
        public List<string> Groups { get; set; } = new List<string>();
        // Ajoutez d'autres propriétés si nécessaire
    }
}

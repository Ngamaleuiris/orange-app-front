using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using AccessTransmitAPI.Services;
using AccessTransmitAPI.Data;
using AccessTransmitAPI.Models;

namespace AccessTransmitAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserNCEImportController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ExcelUserImportService _excelService;

        public UserNCEImportController(ApplicationDbContext context, ExcelUserImportService excelService)
        {
            _context = context;
            _excelService = excelService;
        }

        // POST: api/UserNCEImport/upload
        [HttpPost("upload")]
        public async Task<IActionResult> UploadExcel(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Aucun fichier n'a été uploadé.");

            if (!Path.GetExtension(file.FileName).Equals(".xlsx", StringComparison.OrdinalIgnoreCase))
                return BadRequest("Format invalide. Veuillez envoyer un fichier .xlsx");

            try
            {
                using var stream = new MemoryStream();
                await file.CopyToAsync(stream);
                stream.Position = 0;

                var users = _excelService.ParseNCEExcelToUsers(stream);

                if (users == null || users.Count == 0)
                    return BadRequest("Aucun utilisateur n'a été détecté dans le fichier. Vérifiez les en-têtes de colonnes.");

                _context.UserNCE.AddRange(users);
                await _context.SaveChangesAsync();

                return Ok(new { Message = $"{users.Count} utilisateurs importés avec succès." });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erreur lors de l'import Excel : {ex.Message}");
                return StatusCode(500, new
                {
                    Error = "Erreur lors de l'importation du fichier Excel",
                    Détails = ex.Message
                });
            }
        }    


        // GET: api/UserNCEImport (récupérer tous les utilisateurs)
        [HttpGet]
        public IActionResult GetAllUsers()
        {
                var users = _context.UserNCE.ToList();
                return Ok(users);
        }


        // POST: api/UserNCEImport (création d'un utilisateur)
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserNCE newUser)
        {
                if (newUser == null)
                    return BadRequest("Les données de l'utilisateur sont nulles.");

                try
                {
                    _context.UserNCE.Add(newUser);
                    await _context.SaveChangesAsync();
                    return Ok(new { message = "Utilisateur créé avec succès", userId = newUser.Id });
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Erreur lors de la création de l'utilisateur : {ex.Message}");
                    return StatusCode(500, new { error = "Erreur interne lors de la création de l'utilisateur", details = ex.Message });
                }
        }


        // PUT: api/UserNCEImport/{id} (mise à jour d'un utilisateur)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserNCE updatedUser)
        {
                    var user = await _context.UserNCE.FindAsync(id);
                    if (user == null)
                        return NotFound($"Aucun utilisateur trouvé avec l'ID {id}");

                    user.NCEUserName = updatedUser.NCEUserName;
                    user.Password = updatedUser.Password;
                    user.FullName = updatedUser.FullName;
                    user.DisableAccount = updatedUser.DisableAccount;
                    user.Type = updatedUser.Type;
                    user.CountryRegionCode = updatedUser.CountryRegionCode;
                    user.MobileNumber = updatedUser.MobileNumber;
                    user.EmailAddress = updatedUser.EmailAddress;
                    user.Description = updatedUser.Description;
                    user.Role = updatedUser.Role;
                    user.LoginTimePolicy = updatedUser.LoginTimePolicy;
                    user.ClientIPAddressPolicy = updatedUser.ClientIPAddressPolicy;
                    user.PersonalClientIPAddressPolicy = updatedUser.PersonalClientIPAddressPolicy;
                    user.PasswordValidityPeriod = updatedUser.PasswordValidityPeriod;
                    user.MaxOnlineSessions = updatedUser.MaxOnlineSessions;
                    user.AutoLogoutIfNoActivity = updatedUser.AutoLogoutIfNoActivity;
                    user.AllowedLogins = updatedUser.AllowedLogins;
                    user.Region = updatedUser.Region;
                    user.CreatedOn = updatedUser.CreatedOn;
                    user.LastLogin = updatedUser.LastLogin;
                    user.IsSuspended = updatedUser.IsSuspended;

                    await _context.SaveChangesAsync();
                    return Ok(new { message = "Utilisateur mis à jour avec succès" });
        }


        // PUT: api/UserNCEImport/{id}/suspend (suspendre un utilisateur)
        [HttpPut("{id}/suspend")]
        public async Task<IActionResult> SuspendUser(int id)
        {
                    var user = await _context.UserNCE.FindAsync(id);
                    if (user == null)
                        return NotFound($"Aucun utilisateur trouvé avec l'ID {id}");

                    user.IsSuspended = true;
                    await _context.SaveChangesAsync();

                    return Ok(new { message = "Utilisateur suspendu avec succès" });
        }


        // DELETE: api/UserNCEImport/{id} (suppression d'un utilisateur)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
                    var user = await _context.UserNCE.FindAsync(id);
                    if (user == null)
                        return NotFound($"Aucun utilisateur trouvé avec l'ID {id}");

                    _context.UserNCE.Remove(user);
                    await _context.SaveChangesAsync();

                    return Ok(new { message = "Utilisateur supprimé avec succès" });
        }

        // PUT: api/UserNCEImport/{id}/password (mise à jour du mot de passe)
        [HttpPut("{id}/password")]
        public async Task<IActionResult> UpdatePassword(int id, [FromBody] PasswordUpdateModel model)
        {
            if (string.IsNullOrEmpty(model.NewPassword))
                return BadRequest("Le nouveau mot de passe est requis");

            var user = await _context.UserNCE.FindAsync(id);
            if (user == null)
                return NotFound($"Aucun utilisateur trouvé avec l'ID {id}");

            // Dans une application réelle, vous devriez hasher le mot de passe
            user.Password = model.NewPassword;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Mot de passe mis à jour avec succès" });
        }
    }
}
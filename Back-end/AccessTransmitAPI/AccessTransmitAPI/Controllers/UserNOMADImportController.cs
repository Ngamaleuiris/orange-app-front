using System;
using System.IO;
using System.Threading.Tasks;
using AccessTransmitAPI.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AccessTransmitAPI.Models;
using AccessTransmitAPI.Services;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace AccessTransmitAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserNOMADImportController : ControllerBase
    {
        private readonly ExcelUserImportService _importService;
        private readonly ApplicationDbContext _context;

        public UserNOMADImportController(ExcelUserImportService importService, ApplicationDbContext context)
        {
            _importService = importService;
            _context = context;
        }

        // POST: api/UserNOMADImport/upload (Importer des utilisateurs depuis un fichier Excel)
        [HttpPost("upload")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Aucun fichier fourni");
 
            try
            {
                using var stream = new MemoryStream();
                await file.CopyToAsync(stream);
                stream.Position = 0;

                var users = _importService.ParseNOMADExcelToUsers(stream);

                await _context.UserNOMAD.AddRangeAsync(users);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Importation réussie", count = users.Count });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Erreur lors de l'importation du fichier Excel", détails = ex.Message });
            }
        }

        // GET: api/UserNOMADImport (Lister tous les utilisateurs)
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.UserNOMAD.ToListAsync();
            return Ok(users);
        }

        // POST: api/UserNOMADImport (Créer un utilisateur)
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserNOMAD user)
        {
            if (user == null)
                return BadRequest("Les données de l'utilisateur sont requises.");

            await _context.UserNOMAD.AddAsync(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Utilisateur ajouté avec succès", user });
        }

        // PUT: api/UserNOMADImport/{id} (Modifier un utilisateur)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserNOMAD updatedUser)
        {
            var user = await _context.UserNOMAD.FindAsync(id);
            if (user == null) return NotFound($"Utilisateur avec ID {id} non trouvé.");

            user.NOMADUserName = updatedUser.NOMADUserName;
            user.EmailAddress = updatedUser.EmailAddress;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Utilisateur mis à jour avec succès", user });
        }

        // PUT: api/UserNOMADImport/{id}/suspend (Suspendre un utilisateur)
        [HttpPut("{id}/suspend")]
        public async Task<IActionResult> SuspendUser(int id)
        {
            var user = await _context.UserNOMAD.FindAsync(id);
            if (user == null) return NotFound($"Utilisateur avec ID {id} non trouvé.");

            user.IsSuspended = true;
            await _context.SaveChangesAsync();
            return Ok(new { message = "Utilisateur suspendu avec succès" });
        }

        // DELETE: api/UserNOMADImport/{id} (Supprimer un utilisateur)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.UserNOMAD.FindAsync(id);
            if (user == null) return NotFound($"Utilisateur avec ID {id} non trouvé.");

            _context.UserNOMAD.Remove(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Utilisateur supprimé avec succès" });
        }

        // PUT: api/UserNOMADImport/{id}/password (Modifier le mot de passe d'un utilisateur)
        [HttpPut("{id}/password")]
        public async Task<IActionResult> UpdatePassword(int id, [FromBody] PasswordUpdateModel model)
        {
            if (string.IsNullOrEmpty(model.NewPassword))
                return BadRequest("Le nouveau mot de passe est requis");

            var user = await _context.UserNOMAD.FindAsync(id);
            if (user == null) return NotFound($"Utilisateur avec ID {id} non trouvé.");

            // Dans une application réelle, vous devriez hasher le mot de passe
            user.Password = model.NewPassword;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Mot de passe mis à jour avec succès" });
        }
    }
}
     
    


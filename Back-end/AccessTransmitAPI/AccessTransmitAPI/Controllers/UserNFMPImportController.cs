using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AccessTransmitAPI.Services;
using AccessTransmitAPI.Models;
using AccessTransmitAPI.Data;

namespace AccessTransmitAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserNFMPImportController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ExcelUserImportService _excelService;

        public UserNFMPImportController(ApplicationDbContext context, ExcelUserImportService excelService)
        {
            _context = context;
            _excelService = excelService;
        }


        // POST: api/UserNFMPImport/upload
        [HttpPost("upload")]
        public async Task<IActionResult> UploadExcel(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Aucun fichier n’a été uploadé.");

            if (!Path.GetExtension(file.FileName).Equals(".xlsx", StringComparison.OrdinalIgnoreCase))
                return BadRequest("Format invalide. Veuillez envoyer un fichier .xlsx");

            try
            {
                using var stream = new MemoryStream();
                await file.CopyToAsync(stream);
                stream.Position = 0;

                var users = _excelService.ParseNFMPExcelToUsers(stream);

                if (users == null || users.Count == 0)
                    return BadRequest("Aucun utilisateur n’a été détecté dans le fichier. Vérifiez les en-têtes de colonnes.");

                _context.UserNFMP.AddRange(users);
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


        // GET: api/UserNFMPImport (Lister tous les utilisateurs)
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.UserNFMP.ToListAsync();
            return Ok(users);
        }


        // POST: api/UserNFMPImport (Créer un utilisateur)
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserNFMP user)
        {
            if (user == null)
                return BadRequest("Les données de l'utilisateur sont requises.");

            try
            {
                _context.UserNFMP.Add(user);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Utilisateur créé avec succès", user });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur lors de la création : {ex.Message}");
            }
        }


        // PUT: api/UserNFMPImport/{id} (Modifier un utilisateur)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserNFMP updatedUser)
        {
            var user = await _context.UserNFMP.FindAsync(id);
            if (user == null)
                return NotFound($"Aucun utilisateur trouvé avec l'ID {id}");

            user.NFMPUserName = updatedUser.NFMPUserName;
            user.Description = updatedUser.Description;
            user.EmailAddress = updatedUser.EmailAddress;
            user.UserState = updatedUser.UserState;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Utilisateur mis à jour avec succès", user });
        }


        // PUT: api/UserNFMPImport/{id} (Suspendre un utilisateur)
        [HttpPut("{id}/suspend")]
        public async Task<IActionResult> SuspendUser(int id)
        {
            var user = await _context.UserNFMP.FindAsync(id);
            if (user == null)
                return NotFound($"Aucun utilisateur trouvé avec l'ID {id}");

            user.UserState = "Suspended";
            await _context.SaveChangesAsync();

            return Ok(new { message = "Utilisateur suspendu avec succès" });
        }


        // DELETE: api/UserNFMPImport/{id} (Supprimer un utilisateur)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.UserNFMP.FindAsync(id);
            if (user == null)
                return NotFound($"Aucun utilisateur trouvé avec l'ID {id}");

            _context.UserNFMP.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Utilisateur supprimé avec succès" });
        }
    }
}

        

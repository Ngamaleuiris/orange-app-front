using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using AccessTransmitAPI.Services;
using AccessTransmitAPI.Data; 
using AccessTransmitAPI.Models;

[Route("api/[controller]")]
[ApiController]
public class UserIMONITORImportController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ExcelUserImportService _excelService;

    public UserIMONITORImportController(ApplicationDbContext context, ExcelUserImportService excelService)
    {
        _context = context;
        _excelService = excelService;
    }

    // POST: api/UserIMONITORImport/upload
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

            var users = _excelService.ParseIMONITORExcelToUsers(stream);

            if (users == null || users.Count == 0)
                return BadRequest("Aucun utilisateur n’a été détecté dans le fichier. Vérifiez les en-têtes de colonnes.");

            _context.UserIMONITOR.AddRange(users);
            await _context.SaveChangesAsync();

            return Ok(new { Message = $"{users.Count} utilisateurs importés avec succès." });
        }
        catch (Exception ex)
        {
            var inner = ex.InnerException?.Message;
            var deeper = ex.InnerException?.InnerException?.Message;

            return StatusCode(500, new
            {
                error = "Erreur lors de l'importation du fichier Excel",
                details = inner ?? ex.Message,
                more = deeper
            });
        }
    }


    // GET: api/UserIMONITORImport (récupérer tous les utilisateurs)
    [HttpGet]
    public IActionResult GetAllUsers()
            {
                var users = _context.UserIMONITOR.ToList();
                return Ok(users);
            }


    // POST: api/UserIMONITORImport (créer un utilisateur)
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] UserIMONITOR user)
    {
            if (user == null)
            {
                return BadRequest("Les données de l'utilisateur sont requises.");
            }

            try
            {
                _context.UserIMONITOR.Add(user);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Utilisateur ajouté avec succès", user });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur lors de la création de l'utilisateur : {ex.Message}");
            }
    }


    // PUT: api/UserIMONITORImport/{id} (mettre à jour un utilisateur)
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UserIMONITOR updatedUser)
    {
            var user = await _context.UserIMONITOR.FindAsync(id);
            if (user == null)
                return NotFound($"Aucun utilisateur trouvé avec l'ID {id}");

            user.IMONITORUserName = updatedUser.IMONITORUserName;
            user.imonitorId = updatedUser.imonitorId;
            user.Type = updatedUser.Type;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Utilisateur mis à jour avec succès" });
    }


    // PUT: api/UserIMONITORImport/{id}/suspend (suspendre un utilisateur)
    [HttpPut("{id}/suspend")]
    public async Task<IActionResult> SuspendUser(int id)
    {
            var user = await _context.UserIMONITOR.FindAsync(id);
            if (user == null)
                return NotFound($"Aucun utilisateur trouvé avec l'ID {id}");

            user.Type = "Suspended"; // ou "Inactif", selon ta logique
            await _context.SaveChangesAsync();

            return Ok(new { message = "Utilisateur suspendu avec succès" });
    }


    // DELETE: api/UserIMONITORImport/{id} (supprimer un utilisateur)
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
            var user = await _context.UserIMONITOR.FindAsync(id);
            if (user == null)
                return NotFound($"Aucun utilisateur trouvé avec l'ID {id}");

            _context.UserIMONITOR.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Utilisateur supprimé avec succès" });
    }


}

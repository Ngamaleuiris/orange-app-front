using Microsoft.AspNetCore.Mvc;
using AccessTransmitAPI.Data;
using AccessTransmitAPI.Models;
using OfficeOpenXml;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using Microsoft.EntityFrameworkCore;

namespace AccessTransmitAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompareNCEUsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly string _excelPath = Path.Combine(Directory.GetCurrentDirectory(), "Ressources", "NCEUsers.xlsx");

        public CompareNCEUsersController(ApplicationDbContext context)
        {
            _context = context;
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        }

        [HttpGet]
        public async Task<IActionResult> CompareUsers()
        {
            if (!System.IO.File.Exists(_excelPath))
                return NotFound("Le fichier Excel NCEUsers.xlsx est introuvable.");

            var excelUsers = new List<UserNCE>();

            // Lecture du fichier Excel
            using (var package = new ExcelPackage(new FileInfo(_excelPath)))
            {
                var worksheet = package.Workbook.Worksheets.FirstOrDefault();
                if (worksheet == null)
                    return BadRequest("Le fichier Excel ne contient aucune feuille.");

                var rowCount = worksheet.Dimension.Rows;

                for (int row = 2; row <= rowCount; row++) // ligne 1 = en-têtes
                {
                    var user = new UserNCE
                    {
                        NCEUserName = worksheet.Cells[row, 1].Text,
                        Password = worksheet.Cells[row, 2].Text,
                        FullName = worksheet.Cells[row, 3].Text,
                        DisableAccount = ParseBool(worksheet.Cells[row, 4].Text),
                        Type = worksheet.Cells[row, 5].Text,
                        CountryRegionCode = worksheet.Cells[row, 6].Text,
                        MobileNumber = worksheet.Cells[row, 7].Text,
                        EmailAddress = worksheet.Cells[row, 8].Text,
                        Description = worksheet.Cells[row, 9].Text,
                        Role = worksheet.Cells[row, 10].Text,
                        LoginTimePolicy = worksheet.Cells[row, 11].Text,
                        ClientIPAddressPolicy = worksheet.Cells[row, 12].Text,
                        PersonalClientIPAddressPolicy = worksheet.Cells[row, 13].Text,
                        PasswordValidityPeriod = TryParseInt(worksheet.Cells[row, 14].Text),
                        MaxOnlineSessions = TryParseInt(worksheet.Cells[row, 15].Text),
                        AutoLogoutIfNoActivity = worksheet.Cells[row, 16].Text,
                        AllowedLogins = worksheet.Cells[row, 17].Text,
                        Region = worksheet.Cells[row, 18].Text,
                        CreatedOn = TryParseDate(worksheet.Cells[row, 19].Text),
                        LastLogin = TryParseDate(worksheet.Cells[row, 20].Text)
                    };

                    excelUsers.Add(user);
                }
            }

            var dbUsers = await _context.UserNCE.ToListAsync();
            var result = new List<object>();

            foreach (var excelUser in excelUsers)
            {
                var dbUser = dbUsers.FirstOrDefault(u => u.NCEUserName == excelUser.NCEUserName);

                if (dbUser == null)
                {
                    result.Add(new
                    {
                        NCEUserName = excelUser.NCEUserName,
                        Status = "Absent en base de données"
                    });
                }
                else
                {
                    var differences = new Dictionary<string, (string excel, string db)>();

                    if (dbUser.FullName != excelUser.FullName) differences.Add("FullName", (excelUser.FullName ?? "", dbUser.FullName ?? ""));
                    if (dbUser.EmailAddress != excelUser.EmailAddress) differences.Add("EmailAddress", (excelUser.EmailAddress ?? "", dbUser.EmailAddress ?? ""));
                    if (dbUser.Description != excelUser.Description) differences.Add("Description", (excelUser.Description ?? "", dbUser.Description ?? ""));
                    if (dbUser.Role != excelUser.Role) differences.Add("Role", (excelUser.Role ?? "", dbUser.Role ?? ""));
                    if (dbUser.Region != excelUser.Region) differences.Add("Region", (excelUser.Region ?? "", dbUser.Region ?? ""));
                    if (dbUser.DisableAccount != excelUser.DisableAccount) differences.Add("DisableAccount", (excelUser.DisableAccount?.ToString() ?? "null", dbUser.DisableAccount?.ToString() ?? "null"));
                    if (dbUser.PasswordValidityPeriod != excelUser.PasswordValidityPeriod) differences.Add("PasswordValidityPeriod", (excelUser.PasswordValidityPeriod?.ToString() ?? "null", dbUser.PasswordValidityPeriod?.ToString() ?? "null"));
                    if (dbUser.MaxOnlineSessions != excelUser.MaxOnlineSessions) differences.Add("MaxOnlineSessions", (excelUser.MaxOnlineSessions?.ToString() ?? "null", dbUser.MaxOnlineSessions?.ToString() ?? "null"));
                    if (dbUser.AutoLogoutIfNoActivity != excelUser.AutoLogoutIfNoActivity) differences.Add("AutoLogoutIfNoActivity", (excelUser.AutoLogoutIfNoActivity ?? "", dbUser.AutoLogoutIfNoActivity ?? ""));
                    if (dbUser.AllowedLogins != excelUser.AllowedLogins) differences.Add("AllowedLogins", (excelUser.AllowedLogins ?? "", dbUser.AllowedLogins ?? ""));
                    if (dbUser.CreatedOn != excelUser.CreatedOn) differences.Add("CreatedOn", (excelUser.CreatedOn?.ToString() ?? "null", dbUser.CreatedOn?.ToString() ?? "null"));
                    if (dbUser.LastLogin != excelUser.LastLogin) differences.Add("LastLogin", (excelUser.LastLogin?.ToString() ?? "null", dbUser.LastLogin?.ToString() ?? "null"));

                    result.Add(new
                    {
                        NCEUserName = excelUser.NCEUserName,
                        Status = differences.Count == 0 ? "Identique" : "Différences détectées",
                        Differences = differences
                    });
                }
            }

            return Ok(result);
        }

        private bool ParseBool(string text)
        {
            return text.Trim().ToLower() switch
            {
                "true" or "1" or "yes" => true,
                _ => false
            };
        }

        private int? TryParseInt(string text)
        {
            return int.TryParse(text, out int result) ? result : null;
        }

        private DateTime? TryParseDate(string text)
        {
            return DateTime.TryParse(text, out DateTime result) ? result : null;
        }
    }
}

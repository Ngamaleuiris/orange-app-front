using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using AccessTransmitAPI.Models;

namespace AccessTransmitAPI.Services
{
    public class ExcelDynamicNCEImportService
    {
        // Dictionnaire de correspondance entre les noms d'entêtes dans Excel et les propriétés du modèle
        private readonly Dictionary<string, string> _mappingHeaders = new Dictionary<string, string>
        {
            { "User Name", "NCEUserName" },
            { "Password", "Password" },
            { "Full Name", "FullName" },
            { "Disable Account", "DisableAccount" },
            { "Type", "Type" },
            { "Country/Region code", "CountryRegionCode" },
            { "Mobile Number", "MobileNumber" },
            { "Email Address", "EmailAddress" },
            { "Description", "Description" },
            { "Role", "Role" },
            { "Login Time Policy", "LoginTimePolicy" },
            { "Client IP Address Policy", "ClientIPAddressPolicy" },
            { "Personal Client IP Address Policy", "PersonalClientIPAddressPolicy" },
            { "Password Validity Period (Days)", "PasswordValidityPeriod" },
            { "Max. Online Sessions", "MaxOnlineSessions" },
            { "Auto-Logout If No Activity Within", "AutoLogoutIfNoActivity" },
            { "Allowed Logins", "AllowedLogins" },
            { "Region", "Region" },
            { "Created On", "CreatedOn" },
            { "Last Login", "LastLogin" }
        };

        public ExcelDynamicNCEImportService()
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        }

        public List<UserNCE> ImportExcel(Stream stream)
        {
            using var package = new ExcelPackage(stream);
            var worksheet = package.Workbook.Worksheets[0]; // Prendre la première feuille
            var rowCount = worksheet.Dimension.Rows;
            var colCount = worksheet.Dimension.Columns;

            // Lire les en-têtes et créer le mapping des colonnes
            var columnMapping = new Dictionary<string, int>();
            for (int col = 1; col <= colCount; col++)
            {
                string header = worksheet.Cells[1, col].Text.Trim();
                if (!string.IsNullOrEmpty(header))
                {
                    columnMapping[header] = col;
                }
            }

            // Vérifier que tous les en-têtes nécessaires sont présents
            var users = new List<UserNCE>();
            for (int row = 2; row <= rowCount; row++) // Commencer à la deuxième ligne (ignorer l'en-tête)
            {
                var user = new UserNCE();

                // Pour chaque correspondance de mapping, essayer de trouver la valeur dans le fichier Excel
                foreach (var mapping in _mappingHeaders)
                {
                    string excelHeader = mapping.Key;
                    string modelProperty = mapping.Value;

                    // Si l'entête Excel existe dans le fichier
                    if (columnMapping.TryGetValue(excelHeader, out int colIndex))
                    {
                        string cellValue = worksheet.Cells[row, colIndex].Text;
                        
                        // Affecter la valeur à la propriété correspondante du modèle
                        SetPropertyValue(user, modelProperty, cellValue);
                    }
                }

                users.Add(user);
            }

            return users;
        }

        public (List<string> ExcelHeaders, List<Dictionary<string, string>> ExcelData, List<(string ExcelHeader, string ModelProperty, bool Matched)> Mapping) 
            AnalyzeExcel(Stream stream)
        {
            using var package = new ExcelPackage(stream);
            var worksheet = package.Workbook.Worksheets[0];
            var rowCount = worksheet.Dimension.Rows;
            var colCount = worksheet.Dimension.Columns;

            // Lire les en-têtes
            var excelHeaders = new List<string>();
            for (int col = 1; col <= colCount; col++)
            {
                string header = worksheet.Cells[1, col].Text.Trim();
                if (!string.IsNullOrEmpty(header))
                {
                    excelHeaders.Add(header);
                }
            }

            // Analyser le mapping
            var mappingAnalysis = new List<(string ExcelHeader, string ModelProperty, bool Matched)>();
            foreach (var header in excelHeaders)
            {
                bool matched = _mappingHeaders.TryGetValue(header, out string modelProperty);
                mappingAnalysis.Add((header, modelProperty ?? "Non mappé", matched));
            }

            // Lire les données (pour aperçu)
            var data = new List<Dictionary<string, string>>();
            int previewRows = Math.Min(rowCount, 5); // Limiter à 5 lignes pour l'aperçu
            
            for (int row = 2; row <= previewRows; row++)
            {
                var rowData = new Dictionary<string, string>();
                for (int col = 1; col <= excelHeaders.Count; col++)
                {
                    if (col <= colCount)
                    {
                        rowData[excelHeaders[col - 1]] = worksheet.Cells[row, col].Text;
                    }
                }
                data.Add(rowData);
            }

            return (excelHeaders, data, mappingAnalysis);
        }

        private void SetPropertyValue(UserNCE user, string propertyName, string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                return;

            switch (propertyName)
            {
                case "NCEUserName":
                    user.NCEUserName = value;
                    break;
                case "Password":
                    user.Password = value;
                    break;
                case "FullName":
                    user.FullName = value;
                    break;
                case "DisableAccount":
                    user.DisableAccount = ParseBool(value);
                    break;
                case "Type":
                    user.Type = value;
                    break;
                case "CountryRegionCode":
                    user.CountryRegionCode = value;
                    break;
                case "MobileNumber":
                    user.MobileNumber = value;
                    break;
                case "EmailAddress":
                    user.EmailAddress = value;
                    break;
                case "Description":
                    user.Description = value;
                    break;
                case "Role":
                    user.Role = value;
                    break;
                case "LoginTimePolicy":
                    user.LoginTimePolicy = value;
                    break;
                case "ClientIPAddressPolicy":
                    user.ClientIPAddressPolicy = value;
                    break;
                case "PersonalClientIPAddressPolicy":
                    user.PersonalClientIPAddressPolicy = value;
                    break;
                case "PasswordValidityPeriod":
                    user.PasswordValidityPeriod = ParseInt(value);
                    break;
                case "MaxOnlineSessions":
                    user.MaxOnlineSessions = ParseInt(value);
                    break;
                case "AutoLogoutIfNoActivity":
                    user.AutoLogoutIfNoActivity = value;
                    break;
                case "AllowedLogins":
                    user.AllowedLogins = value;
                    break;
                case "Region":
                    user.Region = value;
                    break;
                case "CreatedOn":
                    user.CreatedOn = ParseDateTime(value);
                    break;
                case "LastLogin":
                    user.LastLogin = ParseDateTime(value);
                    break;
            }
        }

        private bool? ParseBool(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                return null;

            return value.Trim().ToLower() switch
            {
                "true" or "1" or "yes" or "oui" => true,
                "false" or "0" or "no" or "non" => false,
                _ => null
            };
        }

        private int? ParseInt(string value)
        {
            if (int.TryParse(value, out int result))
                return result;
            return null;
        }

        private DateTime? ParseDateTime(string value)
        {
            if (DateTime.TryParse(value, out DateTime result))
                return result;
            return null;
        }
    }
} 
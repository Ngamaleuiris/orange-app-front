using OfficeOpenXml;
using System.Collections.Generic;
using System.IO;
using AccessTransmitAPI.Models;
using System;

namespace AccessTransmitAPI.Services
{
    public class ExcelUserImportService
    {
        //NCE
        public List<UserNCE> ParseNCEExcelToUsers(Stream stream)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using var package = new ExcelPackage(stream);
            var worksheet = package.Workbook.Worksheets[0];
            var rowCount = worksheet.Dimension.Rows;

            var headerMap = new Dictionary<string, int>();
            for (int col = 1; col <= worksheet.Dimension.Columns; col++)
            {
                var header = worksheet.Cells[1, col].Text.Trim();
                if (!string.IsNullOrEmpty(header))
                    headerMap[header] = col;
            }

            var users = new List<UserNCE>();
            for (int row = 2; row <= rowCount; row++)
            {
                var user = new UserNCE
                {
                    NCEUserName = worksheet.Cells[row, headerMap["User Name"]].Text,
                    Password = worksheet.Cells[row, headerMap["Password"]].Text,
                    FullName = worksheet.Cells[row, headerMap["Full Name"]].Text,
                    DisableAccount = worksheet.Cells[row, headerMap["Disable Account"]].Text.ToLower() == "true",
                    Type = worksheet.Cells[row, headerMap["Type"]].Text,
                    CountryRegionCode = worksheet.Cells[row, headerMap["Country/Region code"]].Text,
                    MobileNumber = worksheet.Cells[row, headerMap["Mobile Number"]].Text,
                    EmailAddress = worksheet.Cells[row, headerMap["Email Address"]].Text,
                    Description = worksheet.Cells[row, headerMap["Description"]].Text,
                    Role = worksheet.Cells[row, headerMap["Role"]].Text,
                    LoginTimePolicy = worksheet.Cells[row, headerMap["Login Time Policy"]].Text,
                    ClientIPAddressPolicy = worksheet.Cells[row, headerMap["Client IP Address Policy"]].Text,
                    PersonalClientIPAddressPolicy = worksheet.Cells[row, headerMap["Personal Client IP Address Policy"]].Text,
                    PasswordValidityPeriod = int.TryParse(worksheet.Cells[row, headerMap["Password Validity Period (Days)"]].Text, out var pwdDays) ? pwdDays : 0,
                    MaxOnlineSessions = int.TryParse(worksheet.Cells[row, headerMap["Max. Online Sessions"]].Text, out var maxSess) ? maxSess : 0,
                    AutoLogoutIfNoActivity = worksheet.Cells[row, headerMap["Auto-Logout If No Activity Within"]].Text,
                    AllowedLogins = worksheet.Cells[row, headerMap["Allowed Logins"]].Text,
                    Region = worksheet.Cells[row, headerMap["Region"]].Text,
                    CreatedOn = DateTime.TryParse(worksheet.Cells[row, headerMap["Created On"]].Text, out var created) ? created : DateTime.MinValue,
                    LastLogin = DateTime.TryParse(worksheet.Cells[row, headerMap["Last Login"]].Text, out var lastLogin) ? lastLogin : DateTime.MinValue
                };

                users.Add(user);
            }
            return users;
        }

        //NFMP
        public List<UserNFMP> ParseNFMPExcelToUsers(Stream stream)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using var package = new ExcelPackage(stream);
            var worksheet = package.Workbook.Worksheets[0];
            var rowCount = worksheet.Dimension.Rows;

            var headerMap = new Dictionary<string, int>();
            for (int col = 1; col <= worksheet.Dimension.Columns; col++)
            {
                var header = worksheet.Cells[1, col].Text.Trim();
                if (!string.IsNullOrEmpty(header))
                    headerMap[header] = col;
            }

            var users = new List<UserNFMP>();
            for (int row = 2; row <= rowCount; row++)
            {
                var user = new UserNFMP
                {
                    NFMPUserName = worksheet.Cells[row, headerMap["User Name"]].Text,
                    Description = worksheet.Cells[row, headerMap["Description"]].Text,
                    UserGroup = worksheet.Cells[row, headerMap["User Group"]].Text,
                    UserState = worksheet.Cells[row, headerMap["User State"]].Text,
                    RemoteUser = worksheet.Cells[row, headerMap["Remote User"]].Text,
                    CreationTime = worksheet.Cells[row, headerMap["Creation Time"]].Text, 
                    LastLogin = worksheet.Cells[row, headerMap["Last Login"]].Text,
                    EmailAddress = worksheet.Cells[row, headerMap["E-mail Address"]].Text,
                    ScopeOfCommandProfileID = worksheet.Cells[row, headerMap["Scope of Command Profile ID"]].Text,
                    ScopeOfCommandProfileName = worksheet.Cells[row, headerMap["Scope of Command Profile Name"]].Text,
                    SpanOfControlProfileID = worksheet.Cells[row, headerMap["Span of Control Profile ID"]].Text, 
                    SpanOfControlProfileName = worksheet.Cells[row, headerMap["Span of Control Profile Name"]].Text, 
                    ForceUserPasswordChange = worksheet.Cells[row, headerMap["Force User Password Change"]].Text, 
                    MaxUserOperatorPositionsAllowed = worksheet.Cells[row, headerMap["Maximum User Operator Positions Allowed"]].Text, 
                    MaxOSSSessionsAllowed = worksheet.Cells[row, headerMap["Maximum OSS Sessions Allowed"]].Text, 
                    PublicAlarmFilterForOSS = worksheet.Cells[row, headerMap["Public Alarm Filter for OSS"]].Text, 
                    OSSRequestPriority = worksheet.Cells[row, headerMap["OSS Request Priority"]].Text, 
                    OSSRequestTimeoutSeconds = worksheet.Cells[row, headerMap["OSS Request Timeout (seconds)"]].Text, 
                    ValidClientIPAddress = worksheet.Cells[row, headerMap["Valid Client IP address"]].Text, 
                    EnableIPAddressValidation = worksheet.Cells[row, headerMap["Enable IP Address validation"]].Text, 
                    InactiveDays = worksheet.Cells[row, headerMap["Inactive Days"]].Text, 
                };

                users.Add(user);
            }

            return users;
        }

        //NOMAD
        public List<UserNOMAD> ParseNOMADExcelToUsers(Stream stream)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using var package = new ExcelPackage(stream);
            var worksheet = package.Workbook.Worksheets[0];
            var rowCount = worksheet.Dimension.Rows;

            var headerMap = new Dictionary<string, int>();
            for (int col = 1; col <= worksheet.Dimension.Columns; col++)
            {
                var header = worksheet.Cells[1, col].Text.Trim();
                if (!string.IsNullOrEmpty(header))
                    headerMap[header] = col;
            }

            var users = new List<UserNOMAD>();
            for (int row = 2; row <= rowCount; row++)
            {
                var user = new UserNOMAD
                {
                    NOMADUserName = worksheet.Cells[row, headerMap["Username"]].Text,
                    FirstName = worksheet.Cells[row, headerMap["First name"]].Text,
                    LastName = worksheet.Cells[row, headerMap["Last name"]].Text,
                    EmailAddress = worksheet.Cells[row, headerMap["Email Address"]].Text,
                    Role = worksheet.Cells[row, headerMap["Role"]].Text,
                    Profiles = worksheet.Cells[row, headerMap["Profiles"]].Text,
                    Language = worksheet.Cells[row, headerMap["Language"]].Text,
                    LdapServerName = worksheet.Cells[row, headerMap["LDAP Server Name"]].Text,
                    LdapPath = worksheet.Cells[row, headerMap["LDAP Path"]].Text,
                };
                users.Add(user);
            }

            return users;
        }

        // IMONITOR
        public List<UserIMONITOR> ParseIMONITORExcelToUsers(Stream stream)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using var package = new ExcelPackage(stream);
            var worksheet = package.Workbook.Worksheets[0];
            var rowCount = worksheet.Dimension.Rows;

            var headerMap = new Dictionary<string, int>();
            for (int col = 1; col <= worksheet.Dimension.Columns; col++)
            {
                var header = worksheet.Cells[1, col].Text.Trim();
                if (!string.IsNullOrEmpty(header))
                headerMap[header] = col;
            }

            var users = new List<UserIMONITOR>();
            for (int row = 2; row <= rowCount; row++)
            {
                var user = new UserIMONITOR
                {
                    IMONITORUserName = worksheet.Cells[row, headerMap["Name"]].Text,
                    imonitorId = worksheet.Cells[row, headerMap["ID"]].Text,
                    Type = worksheet.Cells[row, headerMap["Type"]].Text
                };
                users.Add(user);
            }

            return users;
        }
    }
}

using System;

namespace AccessTransmitAPI.Models
{
    public class UserNCE
    {
        public int Id { get; set; }
        public string? NCEUserName { get; set; }
        public string? Password { get; set; }
        public string? FullName { get; set; }
        public bool? DisableAccount { get; set; }
        public string? Type { get; set; }
        public string? CountryRegionCode { get; set; }
        public string? MobileNumber { get; set; }
        public string? EmailAddress { get; set; }
        public string? Description { get; set; }
        public string? Role { get; set; }
        public string? LoginTimePolicy { get; set; }
        public string? ClientIPAddressPolicy { get; set; }
        public string? PersonalClientIPAddressPolicy { get; set; }
        public int? PasswordValidityPeriod { get; set; }
        public int? MaxOnlineSessions { get; set; }
        public string? AutoLogoutIfNoActivity { get; set; }
        public string? AllowedLogins { get; set; }
        public string? Region { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? LastLogin { get; set; }
        public bool? IsSuspended { get; set; } = false;
        public bool Enabled { get; set; } = true;
    }
}

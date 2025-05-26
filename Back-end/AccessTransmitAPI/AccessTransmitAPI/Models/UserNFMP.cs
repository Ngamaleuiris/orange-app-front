using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessTransmitAPI.Models
{
    [Table("usernfmp")]
    public class UserNFMP
    {
        [Key]
        public int Id { get; set; }
        public string? NFMPUserName { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public string? UserGroup { get; set; } = string.Empty;
        public string? UserState { get; set; } = string.Empty;
        public string? RemoteUser { get; set; } = string.Empty;
        public string? CreationTime { get; set; } = string.Empty;
        public string? LastLogin { get; set; } = string.Empty;
        public string? EmailAddress { get; set; } = string.Empty;
        public string? ScopeOfCommandProfileID { get; set; } = string.Empty;
        public string? ScopeOfCommandProfileName { get; set; } = string.Empty;
        public string? SpanOfControlProfileID { get; set; } = string.Empty;
        public string? SpanOfControlProfileName { get; set; } = string.Empty;
        public string? ForceUserPasswordChange { get; set; } = string.Empty;
        public string? MaxUserOperatorPositionsAllowed { get; set; } = string.Empty;
        public string? MaxOSSSessionsAllowed { get; set; } = string.Empty;
        public string? PublicAlarmFilterForOSS { get; set; } = string.Empty;
        public string? OSSRequestPriority { get; set; } = string.Empty;
        public string? OSSRequestTimeoutSeconds { get; set; } = string.Empty;
        public string? ValidClientIPAddress { get; set; } = string.Empty;
        public string? EnableIPAddressValidation { get; set; } = string.Empty;
        public string? InactiveDays { get; set; } = string.Empty;
        public string? Type { get; set; } = string.Empty;
        public bool IsSuspended { get; set; } = false;
    }
}
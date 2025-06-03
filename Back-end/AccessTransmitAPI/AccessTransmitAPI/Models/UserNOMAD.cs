using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccessTransmitAPI.Models
{
    [Table("usernomad")]
    public class UserNOMAD
    {
        [Key]
        public int Id { get; set; }

        public string NOMADUserName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string EmailAddress { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Profiles { get; set; } = string.Empty;
        public string Language { get; set; } = string.Empty;
        public string LdapServerName { get; set; } = string.Empty;
        public string LdapPath { get; set; } = string.Empty;
        public bool IsSuspended { get; set; } = false;
        public string Password { get; set; } = string.Empty;
    }
}

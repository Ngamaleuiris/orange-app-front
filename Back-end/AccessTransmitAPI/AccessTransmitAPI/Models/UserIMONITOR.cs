using System.ComponentModel.DataAnnotations;

namespace AccessTransmitAPI.Models
{
    public class UserIMONITOR
    {
        [Key]
        public int Id { get; set; }

        public string IMONITORUserName { get; set; } = string.Empty;
        public string imonitorId { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public bool IsSuspended { get; set; } = false;
        public string Password { get; set; } = string.Empty;
    }
}

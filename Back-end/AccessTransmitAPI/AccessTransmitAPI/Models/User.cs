using Microsoft.AspNetCore.Identity;

namespace AccessTransmitAPI.Models
{
    public class User : IdentityUser
    {
        public int Cuid { get; set; }// Clé primaire
        public string? UsernameT { get; set; }// Nom d'utilisateur
        public string? Password { get; set; }// Mot de passe
    }
}
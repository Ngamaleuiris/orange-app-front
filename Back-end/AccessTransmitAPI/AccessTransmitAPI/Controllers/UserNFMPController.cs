using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AccessTransmitAPI.Data;
using AccessTransmitAPI.Models;

namespace AccessTransmitAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserNFMPController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserNFMPController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserNFMP>>> GetUsers()
        {
            return await _context.UserNFMP.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserNFMP>> GetUser(int id)
        {
            var user = await _context.UserNFMP.FindAsync(id);
            if (user == null) return NotFound();
            return user;
        }

        [HttpPost]
        public async Task<ActionResult<UserNFMP>> CreateUser(UserNFMP user)
        {
            _context.UserNFMP.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserNFMP user)
        {
            if (id != user.Id) return BadRequest();
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.UserNFMP.FindAsync(id);
            if (user == null) return NotFound();
            _context.UserNFMP.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

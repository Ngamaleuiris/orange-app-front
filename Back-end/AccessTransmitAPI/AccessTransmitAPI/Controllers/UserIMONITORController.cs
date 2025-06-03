using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AccessTransmitAPI.Data;
using AccessTransmitAPI.Models;

namespace AccessTransmitAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserIMONITORController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserIMONITORController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet] 
        public async Task<ActionResult<IEnumerable<UserIMONITOR>>> GetUsers()
        {
            return await _context.UserIMONITOR.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserIMONITOR>> GetUser(int id)
        {
            var user = await _context.UserIMONITOR.FindAsync(id);
            if (user == null) return NotFound();
            return user;
        }

        [HttpPost] 
        public async Task<ActionResult<UserIMONITOR>> CreateUser(UserIMONITOR user)
        {
            _context.UserIMONITOR.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserIMONITOR user)
        {
            if (id != user.Id) return BadRequest();
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.UserIMONITOR.FindAsync(id);
            if (user == null) return NotFound();
            _context.UserIMONITOR.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

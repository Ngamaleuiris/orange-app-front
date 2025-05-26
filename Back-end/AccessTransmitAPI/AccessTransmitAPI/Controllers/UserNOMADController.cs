using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AccessTransmitAPI.Data;
using AccessTransmitAPI.Models;

namespace AccessTransmitAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserNOMADController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserNOMADController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserNOMAD>>> GetUsers()
        {
            return await _context.UserNOMAD.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserNOMAD>> GetUser(int id)
        {
            var user = await _context.UserNOMAD.FindAsync(id);
            if (user == null) return NotFound();
            return user;
        }

        [HttpPost]
        public async Task<ActionResult<UserNOMAD>> CreateUser(UserNOMAD user)
        {
            _context.UserNOMAD.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserNOMAD user)
        {
            if (id != user.Id) return BadRequest();
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.UserNOMAD.FindAsync(id);
            if (user == null) return NotFound();
            _context.UserNOMAD.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

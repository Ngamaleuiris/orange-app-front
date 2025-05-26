// Controllers/UserNCEController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using AccessTransmitAPI.Models;
using AccessTransmitAPI.Data;

[Route("api/[controller]")]
[ApiController]
public class UserNCEController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UserNCEController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/UserNCE
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserNCE>>> GetUsers()
    {
        return await _context.UserNCE.ToListAsync();
    }

    // GET: api/UserNCE/5
    [HttpGet("{id}")]
    public async Task<ActionResult<UserNCE>> GetUser(int id)
    {
        var user = await _context.UserNCE.FindAsync(id);
        if (user == null) return NotFound();
        return user;
    }

    // POST: api/UserNCE
    [HttpPost]
    public async Task<ActionResult<UserNCE>> CreateUser(UserNCE user)
    {
        _context.UserNCE.Add(user);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }

    // PUT: api/UserNCE/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, UserNCE user)
    {
        if (id != user.Id) return BadRequest();
        _context.Entry(user).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/UserNCE/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.UserNCE.FindAsync(id);
        if (user == null) return NotFound();
        _context.UserNCE.Remove(user);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // POST: api/UserNCE/5/suspend
    [HttpPost("{id}/suspend")]
    public async Task<IActionResult> SuspendUser(int id)
    {
        var user = await _context.UserNCE.FindAsync(id);
        if (user == null) return NotFound();
        user.IsSuspended = true;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // POST: api/UserNCE/5/unsuspend
    [HttpPost("{id}/unsuspend")]
    public async Task<IActionResult> UnsuspendUser(int id)
    {
        var user = await _context.UserNCE.FindAsync(id);
        if (user == null) return NotFound();
        user.IsSuspended = false;
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

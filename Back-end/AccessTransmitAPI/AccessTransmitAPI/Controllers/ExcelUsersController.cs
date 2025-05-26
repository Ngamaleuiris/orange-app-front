
using Microsoft.AspNetCore.Mvc;
using AccessTransmitAPI.Services;

namespace AccessTransmitAPI.Controllers
{
    [ApiController]
    [Route("api/users-excel")]
    public class ExcelUsersController : ControllerBase
    {
        private readonly ExcelDynamicImportService _excelService;

        public ExcelUsersController(ExcelDynamicImportService excelService)
        {
            _excelService = excelService;
        }

        [HttpGet("{tool}")]
        public IActionResult GetUsersFromTool(string tool)
        {
            try
            {
                var (headers, rows) = _excelService.ReadExcelDynamic(tool);
                return Ok(new { headers, rows });
            }
            catch (FileNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Erreur serveur : {ex.Message}" });
            }
        }
    }
}

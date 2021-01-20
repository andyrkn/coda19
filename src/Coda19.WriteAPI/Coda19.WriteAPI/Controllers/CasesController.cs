using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Coda19.WriteAPI.Controllers
{
    [ApiController]
    [Route("/api/v1/admin/cases")]
    public sealed class CasesController : ControllerBase
    {
        [HttpGet]
        public Task<IActionResult> Get()
        {
            return Task.FromResult<IActionResult>(Ok());
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Coda19.EvolutionAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public sealed class EvolutionController : ControllerBase
    {
        [HttpGet]
        public Task<IActionResult> Get()
        {
            return Task.FromResult<IActionResult>(Ok());
        }
    }
}

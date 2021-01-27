using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Coda19.Evolution.Business;
using Coda19.Evolution.Business.Leaderboard;
using MediatR;

namespace Coda19.EvolutionAPI.Controllers
{
    [ApiController]
    [Route("api/evolution/[controller]")]
    public sealed class GlobalController : ControllerBase
    {
        private readonly IMediator _mediator;

        public GlobalController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("/all")]
        public async Task<IActionResult> GetTotalCases([FromQuery] GetTotalCasesQuery command) => Ok(await _mediator.Send(command));
    }
}

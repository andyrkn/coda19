using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Coda19.Evolution.Business;
using Coda19.Evolution.Business.Country;
using Coda19.Evolution.Business.Global;
using Coda19.Evolution.Business.Leaderboard;
using MediatR;

namespace Coda19.EvolutionAPI.Controllers
{
    [ApiController]
    [Route("api/evolution/[controller]/")]
    public sealed class GlobalController : ControllerBase
    {
        private readonly IMediator _mediator;

        public GlobalController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetTotalCases([FromQuery] GetAllQuery command) => Ok(await _mediator.Send(command));

        [HttpGet("cases")]
        public async Task<IActionResult> Get([FromQuery] GetGlobalCasesSinceQuery command) => Ok(await _mediator.Send(command));

        [HttpGet("deaths")]
        public async Task<IActionResult> Get([FromQuery] GetGlobalDeathsSinceQuery command) => Ok(await _mediator.Send(command));

        [HttpGet("tests")]
        public async Task<IActionResult> Get([FromQuery] GetGlobalTestsSinceQuery command) => Ok(await _mediator.Send(command));
    }
}

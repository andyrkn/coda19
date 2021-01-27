using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Coda19.Evolution.Business.Leaderboard;
using MediatR;

namespace Coda19.EvolutionAPI.Controllers
{
    [ApiController]
    [Route("api/evolution/[controller]")]
    public sealed class LeaderboardController : ControllerBase
    {
        private readonly IMediator _mediator;

        public LeaderboardController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("/leaderboard/cases")]
        public async Task<IActionResult> Get([FromQuery] GetNewCasesQuery command) => Ok(await _mediator.Send(command));

        [HttpGet("/leaderboard/deaths")]
        public async Task<IActionResult> Get([FromQuery] GetNewDeathsQuery command) => Ok(await _mediator.Send(command));

        [HttpGet("/leaderboard/tests")]
        public async Task<IActionResult> Get([FromQuery] GetNewTestsQuery command) => Ok(await _mediator.Send(command));
    }
}

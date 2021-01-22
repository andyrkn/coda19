using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Coda19.Evolution.Business.GetCases;
using MediatR;

namespace Coda19.EvolutionAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public sealed class EvolutionController : ControllerBase
    {
        private readonly IMediator _mediator;

        public EvolutionController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("/country/rank")]
        public async Task<IActionResult> Get([FromQuery] GetNewCasesSince command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpGet("/country/fatalities")]
        public Task GetGlobal()
        {
            return Task.CompletedTask;
        }
    }
}

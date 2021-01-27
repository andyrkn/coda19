using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Coda19.Evolution.Business;
using Coda19.Evolution.Business.Country;
using MediatR;

namespace Coda19.EvolutionAPI.Controllers
{
    [ApiController]
    [Route("api/evolution/[controller]")]
    public sealed class CountryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CountryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("/country/cases")]
        public async Task<IActionResult> Get([FromQuery] GetCasesByCountryQuery command) => Ok(await _mediator.Send(command));

        [HttpGet("/country/deaths")]
        public async Task<IActionResult> Get([FromQuery] GetDeathsByCountryQuery command) => Ok(await _mediator.Send(command));

        [HttpGet("/country/tests")]
        public async Task<IActionResult> Get([FromQuery] GetTestsByCountryQuery command) => Ok(await _mediator.Send(command));
    }
}

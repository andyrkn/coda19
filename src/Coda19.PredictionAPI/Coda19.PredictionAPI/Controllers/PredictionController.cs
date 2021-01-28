using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Coda19.PredictionAPI.Business;
using MediatR;

namespace Coda19.PredictionAPI.Controllers
{
    [ApiController]
    [Route("api/prediction")]
    public class PredictionController : ControllerBase
    {
        private readonly IMediator mediator;

        public PredictionController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] GetPredictionQuery query)
        {
            return Ok(await mediator.Send(query));
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Coda19.Core.OWID;
using Coda19.Core.SparqlBuilder;
using System.Threading.Tasks;

namespace Coda19.SupportAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TipsController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
            => Ok(await new SparqlQueryBuilder(OWIDConstants.TipsPrefix)
                .AddOWidPrefixes()
                .AddLiteral(nameof(TipsModel.Title))
                .AddLiteral(nameof(TipsModel.Description))
                .Paginate(0, 50)
                .Build()
                .RunRawRandomResult());

    }
}

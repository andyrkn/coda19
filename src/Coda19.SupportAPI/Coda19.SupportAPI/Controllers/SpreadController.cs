using Microsoft.AspNetCore.Mvc;
using Coda19.Core.OWID;
using Coda19.Core.SparqlBuilder;
using System.Threading.Tasks;

namespace Coda19.SupportAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpreadController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
            => Ok(await new SparqlQueryBuilder(OWIDConstants.SpreadPrefix)
                .AddOWidPrefixes()
                .AddLiteral(nameof(SpreadModel.Title))
                .AddLiteral(nameof(SpreadModel.Description))
                .Paginate(0, 50)
                .Build()
                .RunRawRandomResult());
    }
}

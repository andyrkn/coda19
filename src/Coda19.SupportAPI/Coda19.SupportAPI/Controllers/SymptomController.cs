using Microsoft.AspNetCore.Mvc;
using Coda19.Core.OWID;
using Coda19.Core.SparqlBuilder;
using System.Threading.Tasks;
namespace Coda19.SupportAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SymptomController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
            => Ok(await new SparqlQueryBuilder(OWIDConstants.SymptomPrefix)
                .AddOWidPrefixes()
                .AddLiteral(nameof(SymptomModel.Title))
                .AddLiteral(nameof(SymptomModel.Description))
                .Paginate(0, 50)
                .Build()
                .RunRawRandomResult());

    }
}

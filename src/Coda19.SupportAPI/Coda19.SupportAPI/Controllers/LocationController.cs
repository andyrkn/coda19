using System.Threading.Tasks;
using Coda19.Core.OWID;
using Coda19.Core.SparqlBuilder;
using Microsoft.AspNetCore.Mvc;

namespace Coda19.SupportAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationController : ControllerBase
    {
        [HttpGet("all")]
        public async Task<IActionResult> GetAll() 
            => Ok(await new SparqlQueryBuilder(OWIDConstants.LocationPrefix)
                .AddOWidPrefixes()
                .AddSubject("uid")
                .UseSubject("uid")
                .AddLiteral(nameof(CountryModel.Continent))
                .AddLiteral(nameof(CountryModel.Location))
                .Paginate(0, 500)
                .Build()
                .RunRaw());

    }
}
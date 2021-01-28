using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Coda19.Core.OWID;
using Coda19.Core.SparqlBuilder;
using MediatR;

namespace Coda19.Evolution.Business.Country
{
    public sealed class GetTestsByCountryQuery : GetFilterModel, IRequest<IDictionary<string, string>>
    {
        public DateTime? StartDate { get; set; }

        public List<string> Country { get; set; }
    }

    internal sealed class GetTestsByCountryQueryHandler : IRequestHandler<GetTestsByCountryQuery, IDictionary<string, string>>
    {
        public async Task<IDictionary<string, string>> Handle(GetTestsByCountryQuery request, CancellationToken cancellationToken)
        {
            request.StartDate ??= new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);

            var tasks = request.Country.Select(async country => new KeyValuePair<string, string>(
                country,
                await HandleCountry(request.StartDate.Value, country, request.PageIndex, request.PageSize)));

            var results = await Task.WhenAll(tasks);
            return results.ToDictionary(k => k.Key, v => v.Value);
        }

        private Task<string> HandleCountry(DateTime dateTime, string country, int pageIndex, int pageSize)
            => new SparqlQueryBuilder(OWIDConstants.EventsPrefix)
                .AddOWidPrefixes()
                .AddLiteral(nameof(DayModel.Date))
                .UseLiteral(nameof(CountryModel.Location))
                .AddLiteral(nameof(DayModel.NewTests))
                .FilterGreaterThanAndEqual(nameof(DayModel.Date), nameof(CountryModel.Location), dateTime, country)
                .Paginate(pageIndex * pageSize, pageSize)
                .Build()
                .RunRaw();
    }
}
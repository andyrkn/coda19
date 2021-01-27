using System;
using System.Threading;
using System.Threading.Tasks;
using Coda19.Core.OWID;
using Coda19.Core.SparqlBuilder;
using MediatR;

namespace Coda19.Evolution.Business.Country
{
    public sealed class GetDeathsByCountryQuery: GetFilterModel, IRequest<string>
    {
        public DateTime? StartDate { get; set; }

        public string Country { get; set; }
    }

    internal sealed class GetDeathsByCountryQueryHandler : IRequestHandler<GetDeathsByCountryQuery, string>
    {
        public Task<string> Handle(GetDeathsByCountryQuery request, CancellationToken cancellationToken)
        {
            request.StartDate ??= new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);

            return new SparqlQueryBuilder(OWIDConstants.EventsPrefix)
                .AddOWidPrefixes()
                .AddLiteral(nameof(DayModel.Date))
                .AddLiteral(nameof(CountryModel.Location))
                .AddLiteral(nameof(DayModel.NewDeaths))
                .FilterGreaterThanAndEqual(nameof(DayModel.Date), nameof(CountryModel.Location), request.StartDate, request.Country)
                .Paginate(request.PageIndex * request.PageSize, request.PageSize)
                .Build()
                .RunRaw();
        }
    }
}

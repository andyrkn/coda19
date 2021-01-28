using System;
using System.Threading;
using System.Threading.Tasks;
using Coda19.Core.OWID;
using Coda19.Core.SparqlBuilder;
using MediatR;

namespace Coda19.Evolution.Business.Leaderboard
{
    public sealed class GetNewTestsQuery: GetFilterModel, IRequest<string>
    {
        public DateTime? StartDate { get; set; }
    }

    internal sealed class GetNewTestsSinceQueryHandler : IRequestHandler<GetNewTestsQuery, string>
    {
        public Task<string> Handle(GetNewTestsQuery request, CancellationToken cancellationToken)
        {
            request.StartDate ??= new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);

            return new SparqlQueryBuilder(OWIDConstants.EventsPrefix)
                .AddOWidPrefixes()
                .AddSubject(nameof(CountryModel.Location))
                .UseDefaultSubject()
                .Sum(nameof(DayModel.NewTests))
                .UseLiteral(nameof(DayModel.Date))
                .AddLink(OWIDConstants.LocationLink, OWIDConstants.LocationPrefix, nameof(CountryModel.Continent), nameof(CountryModel.Continent))
                .AddLink(OWIDConstants.LocationLink, OWIDConstants.LocationPrefix, nameof(CountryModel.Location), nameof(CountryModel.Location))
                .FilterGreaterThan(nameof(DayModel.Date), request.StartDate)
                .OrderBy(nameof(DayModel.NewTests), true)
                .GroupBy(nameof(CountryModel.Location))
                .Paginate(request.PageIndex*request.PageSize, request.PageSize)
                .Build()
                .RunRaw();
        }
    }
}
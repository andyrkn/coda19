using System;
using System.Threading;
using System.Threading.Tasks;
using Coda19.Core.OWID;
using Coda19.Core.SparqlBuilder;
using MediatR;

namespace Coda19.Evolution.Business.Global
{
    public sealed class GetGlobalTestsSinceQuery: GetFilterModel, IRequest<string>
    {
        public DateTime? StartDate { get; set; }
    }

    internal sealed class GetGlobalTestsSinceQueryHandler : IRequestHandler<GetGlobalTestsSinceQuery, string>
    {
        public Task<string> Handle(GetGlobalTestsSinceQuery request, CancellationToken cancellationToken)
        {
            request.StartDate ??= new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);

            return new SparqlQueryBuilder(OWIDConstants.EventsPrefix)
                .AddOWidPrefixes()
                .Sum(nameof(DayModel.NewTests))
                .AddLiteral(nameof(DayModel.Date))
                .FilterGreaterThan(nameof(DayModel.Date), request.StartDate)
                .Paginate(request.PageIndex * request.PageSize, request.PageSize)
                .GroupBy(nameof(DayModel.Date))
                .Build()
                .RunRaw();
        }
    }
}

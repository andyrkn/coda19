using System.Threading;
using System.Threading.Tasks;
using Coda19.Core.OWID;
using Coda19.Core.SparqlBuilder;
using MediatR;

namespace Coda19.Evolution.Business
{
    public sealed class GetTotalCasesQuery: GetFilterModel, IRequest<string>
    {
    }

    internal sealed class GetTotalCasesCommandHandler : IRequestHandler<GetTotalCasesQuery, string>
    {
        public Task<string> Handle(GetTotalCasesQuery request, CancellationToken cancellationToken)
        {
            return new SparqlQueryBuilder(OWIDConstants.EventsPrefix)
                .AddOWidPrefixes()
                .Sum(nameof(DayModel.TotalCases))
                .Sum(nameof(DayModel.TotalTests))
                .Sum(nameof(DayModel.TotalDeaths))
                .Paginate(request.PageIndex * request.PageSize, request.PageSize)
                .Build()
                .RunRaw();
        }
    }
}

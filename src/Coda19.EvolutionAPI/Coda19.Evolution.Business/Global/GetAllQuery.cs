using System.Threading;
using System.Threading.Tasks;
using Coda19.Core.OWID;
using Coda19.Core.SparqlBuilder;
using MediatR;

namespace Coda19.Evolution.Business.Global
{
    public sealed class GetAllQuery: GetFilterModel, IRequest<string>
    {
    }

    internal sealed class GetTotalCasesQueryHandler : IRequestHandler<GetAllQuery, string>
    {
        public Task<string> Handle(GetAllQuery request, CancellationToken cancellationToken)
        {
            return new SparqlQueryBuilder(OWIDConstants.EventsPrefix)
                .AddOWidPrefixes()
                .Sum(nameof(DayModel.NewTests))
                .Sum(nameof(DayModel.NewDeaths))
                .Sum(nameof(DayModel.NewCases))
                .Paginate(request.PageIndex * request.PageSize, request.PageSize)
                .Build()
                .RunRaw();
        }
    }
}

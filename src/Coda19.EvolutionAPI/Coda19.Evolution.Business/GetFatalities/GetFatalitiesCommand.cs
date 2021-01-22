using System;
using MediatR;

namespace Coda19.Evolution.Business.GetFatalities
{
    public sealed class GetFatalitiesCommand : GetFilterModel, IRequest
    {
        public DateTime? StartDate { get; set; }
    }
}
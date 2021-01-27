﻿using System;
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

    internal sealed class GetDeathsByCountryCommandHandler : IRequestHandler<GetDeathsByCountryQuery, string>
    {
        public Task<string> Handle(GetDeathsByCountryQuery request, CancellationToken cancellationToken)
        {
            request.StartDate ??= new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);

            return new SparqlQueryBuilder(OWIDConstants.EventsPrefix)
                .AddOWidPrefixes()
                .AddSubject(nameof(CountryModel.Location))
                .AddSubject(nameof(DayModel.Date))
                .AddSubject(nameof(DayModel.NewDeaths))
                .UseLiteral(nameof(DayModel.Date))
                .UseLiteral(nameof(CountryModel.Location))
                .UseLiteral(nameof(DayModel.NewDeaths))
                .FilterGreaterThanAndEqual(nameof(DayModel.Date), nameof(CountryModel.Location), request.StartDate, request.Country)
                .Paginate(request.PageIndex * request.PageSize, request.PageSize)
                .Build()
                .RunRaw();
        }
    }
}

﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Coda19.Core.OWID;
using Coda19.Core.SparqlBuilder;
using System.Threading;
using System.Threading.Tasks;

namespace Coda19.Evolution.Business.GetCases
{
    public sealed class GetCasesByCountryQuery: GetFilterModel, IRequest<string>
    {
        public DateTime? StartDate { get; set; }

        public string Country { get; set; }
    }

    internal sealed class GetCasesByCountryCommandHandler : IRequestHandler<GetCasesByCountryQuery, string>
    {
        public Task<string> Handle(GetCasesByCountryQuery request, CancellationToken cancellationToken)
        {
            request.StartDate ??= new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);

            return new SparqlQueryBuilder(OWIDConstants.EventsPrefix)
                .AddOWidPrefixes()
                .AddSubject(nameof(CountryModel.Location))
                .AddSubject(nameof(DayModel.Date))
                .AddSubject(nameof(DayModel.TotalCases))
                .AddSubject(nameof(DayModel.TotalTests))
                .AddSubject(nameof(DayModel.TotalDeaths))
                .UseLiteral(nameof(DayModel.Date))
                .UseLiteral(nameof(CountryModel.Location))
                .UseLiteral(nameof(DayModel.TotalCases))
                .UseLiteral(nameof(DayModel.TotalTests))
                .UseLiteral(nameof(DayModel.TotalDeaths))
                .FilterGreaterThanAndEqual(nameof(DayModel.Date), nameof(CountryModel.Location), request.StartDate, request.Country)
                .Paginate(request.PageIndex * request.PageSize, request.PageSize)
                .Build()
                .RunRaw();
        }
    }
}
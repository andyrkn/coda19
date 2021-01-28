using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Coda19.Core.OWID;
using Coda19.Core.SparqlBuilder;
using MediatR;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Coda19.PredictionAPI.Business
{
    public sealed class GetPredictionQuery : IRequest<List<OutputModel>>
    {
        public string Country { get; set; }
    }

    internal sealed class GetPredictionQueryHandler : IRequestHandler<GetPredictionQuery, List<OutputModel>>
    {
        private readonly string _endpoint;
        private readonly IHttpClientFactory factory;
        private readonly IConfiguration Config;

        public GetPredictionQueryHandler(IHttpClientFactory factory, IConfiguration config)
        {
            this.factory = factory;
            Config = config;
            _endpoint = config.GetConnectionString("flask");
        }

        public async Task<List<OutputModel>> Handle(GetPredictionQuery request, CancellationToken cancellationToken)
        {
            var date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);

            var readData = await new SparqlQueryBuilder(OWIDConstants.EventsPrefix)
                .AddOWidPrefixes()
                .AddSubject(nameof(DayModel.NewCases))
                .UseLiteral(nameof(DayModel.Date))
                .UseLiteral(nameof(CountryModel.Location))
                .UseLiteral(nameof(DayModel.NewCases))
                .FilterGreaterThanAndEqual(nameof(DayModel.Date), nameof(CountryModel.Location), date, request.Country)
                .Paginate(0, int.MaxValue)
                .Build()
                .Run<ReadModel>();

            var records = readData.Records.ToList();
            var head = $"?data={records[0].NewCases}";
            var callData = records.Skip(1)
                .Select(x => $"&data={x.NewCases}");
            var requri = $"{head}{string.Join(string.Empty, callData)}";

            var prediction = await factory.CreateClient().GetAsync($"{_endpoint}{requri}", cancellationToken);

            var predicted = JsonConvert.DeserializeObject<List<double>>(await prediction.Content.ReadAsStringAsync(cancellationToken));

            var endResult = new List<OutputModel>();

            for (int i = 0; i < predicted.Count; i++)
            {
                var o = new OutputModel
                {
                    NewCases = Convert.ToInt32(predicted[i]),
                    Date = DateTime.Now.AddDays(i + 1).ToString("d")
                };
                endResult.Add(o);
            }

            return endResult;
        }
    }

    public sealed class OutputModel
    {
        public long NewCases { get; set; }
        public string Date { get; set; }
    }

    sealed class ReadModel
    {
        public long NewCases { get; set; }
    }
}
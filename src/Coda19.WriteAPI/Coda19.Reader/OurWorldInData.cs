using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using VDS.RDF;
using VDS.RDF.Storage;

namespace Coda19.Reader
{
    public sealed class OurWorldInData
    {
        private readonly string Path;
        private const string RepoUrl = "http://localhost:7200";

        public OurWorldInData(string path)
        {
            Path = path;
        }

        public async Task Read()
        {
            var connector = new SesameHttpProtocolConnector(RepoUrl, OWIDConstants.RepoId) {Timeout = int.MaxValue};

            var baseGraph = new Graph();
            baseGraph.NamespaceMap.AddNamespace(OWIDConstants.EventsPrefix, OWIDConstants.EventsUri);
            baseGraph.NamespaceMap.AddNamespace(OWIDConstants.LocationPrefix, OWIDConstants.LocationUri);
            baseGraph.NamespaceMap.AddNamespace(OWIDConstants.DatePrefix, OWIDConstants.DateUri);

            var data = JsonConvert.DeserializeObject<IDictionary<string, CountryModel>>(await File.ReadAllTextAsync(Path));
            var total = data.Sum(d => d.Value.Data.Count);
            int starts = 0;

            var tasks = data.Select(async entry =>
            {
                var locationTriples = new SparqlUpdateBuilder(baseGraph)
                    .AddSubject($"{OWIDConstants.LocationPrefix}:{entry.Key}")
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryModel.Continent)}", entry.Value.Continent)
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryModel.Location)}", entry.Value.Location)
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryModel.Population)}", entry.Value.Population)
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryModel.LifeExpectancy)}", entry.Value.LifeExpectancy)
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryModel.DevelopmentIndex)}", entry.Value.DevelopmentIndex)
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryModel.Over65)}", entry.Value.Over65)
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryModel.Over70)}", entry.Value.Over70)
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryModel.FemaleSmokers)}", entry.Value.FemaleSmokers)
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryModel.MaleSmokers)}", entry.Value.MaleSmokers)
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryModel.HospitalBedsPerThousand)}", entry.Value.HospitalBedsPerThousand)
                    .Get();

                await Task.Run(() => connector.UpdateGraph(OWIDConstants.LocationUri, locationTriples, null));

                var eventTriples = entry.Value.Data.Select(dayModel =>
                    {
                        Console.WriteLine($"Started {starts++}/{total}");
                        return new SparqlUpdateBuilder(baseGraph)
                            .AddSubject($"{OWIDConstants.EventsPrefix}:{Guid.NewGuid():N}")
                            .AddLink($"{OWIDConstants.EventsPrefix}:locationlink", $"{OWIDConstants.LocationPrefix}:{entry.Key}")
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:location", $"{entry.Key}")
                            .AddLink($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.Date)}link", $"{OWIDConstants.DatePrefix}:{dayModel.Date}")
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.Date)}", $"{dayModel.Date}")
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.NewCases)}", dayModel.NewCases)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.TotalCases)}", dayModel.TotalCases)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.TotalCasesPerMillion)}", dayModel.TotalCasesPerMillion)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.NewTests)}", dayModel.NewTests)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.TotalTests)}", dayModel.TotalTests)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.NewDeaths)}", dayModel.NewDeaths)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.TotalDeaths)}", dayModel.TotalDeaths)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.StringencyIndex)}", dayModel.StringencyIndex)
                            .Get();
                    })
                    .SelectMany(locTriples => locTriples);
                await Task.Run(() => connector.UpdateGraph(OWIDConstants.EventsUri, eventTriples, null));
            });

            await Task.WhenAll(tasks);

            Console.WriteLine("Complete.");
        }
    }
}
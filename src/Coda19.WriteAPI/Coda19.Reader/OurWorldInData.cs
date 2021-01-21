using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Coda19.Core.OWID;
using Coda19.Core.SparqlBuilder;
using Coda19.Core.SparqlRunner;
using Newtonsoft.Json;
using VDS.RDF;

namespace Coda19.Reader
{
    public sealed class OurWorldInData
    {
        private readonly string Path;

        public OurWorldInData(string path)
        {
            Path = path;
        }

        public async Task Read()
        {
            var baseGraph = new Graph();
            baseGraph.NamespaceMap.AddNamespace(OWIDConstants.EventsPrefix, OWIDConstants.EventsUri);
            baseGraph.NamespaceMap.AddNamespace(OWIDConstants.LocationPrefix, OWIDConstants.LocationUri);
            baseGraph.NamespaceMap.AddNamespace(OWIDConstants.DatePrefix, OWIDConstants.DateUri);

            var data = JsonConvert.DeserializeObject<IDictionary<string, CountryReadModel>>(await File.ReadAllTextAsync(Path));
            var total = data.Sum(d => d.Value.Data.Count);
            int starts = 0;

            var tasks = data.Select(async entry =>
            {
                await new SparqlUpdateBuilder(baseGraph)
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
                    .Get()
                    .Execute(OWIDConstants.LocationUri)
                    .ConfigureAwait(false);

                var eventTriples = entry.Value.Data.Select(dayModel =>
                    {
                        Console.WriteLine($"Started {starts++}/{total}");
                        return new SparqlUpdateBuilder(baseGraph)
                            .AddSubject($"{OWIDConstants.EventsPrefix}:{Guid.NewGuid():N}")
                            .AddLink($"{OWIDConstants.EventsPrefix}:{OWIDConstants.LocationLink}", $"{OWIDConstants.LocationPrefix}:{entry.Key}")
                            .AddLink($"{OWIDConstants.EventsPrefix}:{nameof(OWIDConstants.DateLink)}", $"{OWIDConstants.DatePrefix}:{dayModel.Date}")
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(CountryModel.Location)}", $"{entry.Key}")
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.Date)}", DateTime.ParseExact(dayModel.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture))
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.NewCases)}", dayModel.NewCases)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.TotalCases)}", dayModel.TotalCases)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.TotalCasesPerMillion)}", dayModel.TotalCasesPerMillion)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.NewTests)}", dayModel.NewTests)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.TotalTests)}", dayModel.TotalTests)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.NewDeaths)}", dayModel.NewDeaths)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.TotalDeaths)}", dayModel.TotalDeaths)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayModel.StringencyIndex)}", dayModel.StringencyIndex)
                            .GetTriples();
                    })
                    .SelectMany(locTriples => locTriples);
                await new SparqlCommandRunner(eventTriples).Execute(OWIDConstants.EventsUri).ConfigureAwait(false);
            });

            await Task.WhenAll(tasks);

            Console.WriteLine("Complete.");
        }
    }
}
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
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryReadModel.Continent)}", entry.Value.Continent)
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryReadModel.Location)}", entry.Value.Location)
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryReadModel.Population)}", entry.Value.Population)
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryReadModel.LifeExpectancy)}", entry.Value.LifeExpectancy)
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryReadModel.DevelopmentIndex)}", entry.Value.DevelopmentIndex)
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryReadModel.Over65)}", entry.Value.Over65)
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryReadModel.Over70)}", entry.Value.Over70)
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryReadModel.FemaleSmokers)}", entry.Value.FemaleSmokers)
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryReadModel.MaleSmokers)}", entry.Value.MaleSmokers)
                    .AddLiteralTriple($"{OWIDConstants.LocationPrefix}:{nameof(CountryReadModel.HospitalBedsPerThousand)}", entry.Value.HospitalBedsPerThousand)
                    .Get()
                    .Execute(OWIDConstants.LocationUri)
                    .ConfigureAwait(false);

                var eventTriples = entry.Value.Data.Select(model =>
                    {
                        Console.WriteLine($"Started {starts++}/{total}");
                        return new SparqlUpdateBuilder(baseGraph)
                            .AddSubject($"{OWIDConstants.EventsPrefix}:{Guid.NewGuid():N}")
                            .AddLink($"{OWIDConstants.EventsPrefix}:{OWIDConstants.LocationLink}", $"{OWIDConstants.LocationPrefix}:{entry.Key}")
                            .AddLink($"{OWIDConstants.EventsPrefix}:{nameof(OWIDConstants.DateLink)}", $"{OWIDConstants.DatePrefix}:{model.Date}")
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(CountryReadModel.Location)}", $"{entry.Key}")
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayReadModel.Date)}", DateTime.ParseExact(model.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture))
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayReadModel.NewCases)}", model.NewCases)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayReadModel.TotalCases)}", model.TotalCases)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayReadModel.TotalCasesPerMillion)}", model.TotalCasesPerMillion)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayReadModel.NewTests)}", model.NewTests)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayReadModel.TotalTests)}", model.TotalTests)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayReadModel.NewDeaths)}", model.NewDeaths)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayReadModel.TotalDeaths)}", model.TotalDeaths)
                            .AddLiteralTriple($"{OWIDConstants.EventsPrefix}:{nameof(DayReadModel.StringencyIndex)}", model.StringencyIndex)
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
using Coda19.Core.OWID;
using Coda19.Core.SparqlBuilder;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using VDS.RDF;


namespace Coda19.Reader
{
    public sealed class SpreadData
    {
        private readonly string Path;

        public SpreadData(string path)
        {
            Path = path;
        }

        public async Task Read()
        {
            var baseGraph = new Graph();
            baseGraph.NamespaceMap.AddNamespace(OWIDConstants.SpreadPrefix, OWIDConstants.SpreadUri);

            var data = JsonConvert.DeserializeObject<IDictionary<string, SpreadModel>>(await File.ReadAllTextAsync(Path));

            var tasks = data.Select(async entry =>
            {
                await new SparqlUpdateBuilder(baseGraph)
                    .AddSubject($"{OWIDConstants.SpreadPrefix}:{entry.Key}")
                    .AddLiteralTriple($"{OWIDConstants.SpreadPrefix}:{nameof(SpreadModel.Title)}", entry.Value.Title)
                    .AddLiteralTriple($"{OWIDConstants.SpreadPrefix}:{nameof(SpreadModel.Description)}", entry.Value.Description)
                    .Get()
                    .Execute(OWIDConstants.SpreadUri)
                    .ConfigureAwait(false);
            });

            await Task.WhenAll(tasks);

            Console.WriteLine("Complete.");
        }
    }
}

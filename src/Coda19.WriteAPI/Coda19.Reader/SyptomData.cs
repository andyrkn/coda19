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
    public sealed class SyptomData
    {
        private readonly string Path;

        public SyptomData(string path)
        {
            Path = path;
        }

        public async Task Read()
        {
            var baseGraph = new Graph();
            baseGraph.NamespaceMap.AddNamespace(OWIDConstants.SymptomPrefix, OWIDConstants.SymptomUri);

            var data = JsonConvert.DeserializeObject<IDictionary<string, TipsModel>>(await File.ReadAllTextAsync(Path));

            var tasks = data.Select(async entry =>
            {
                await new SparqlUpdateBuilder(baseGraph)
                    .AddSubject($"{OWIDConstants.SymptomPrefix}:{entry.Key}")
                    .AddLiteralTriple($"{OWIDConstants.SymptomPrefix}:{nameof(TipsModel.Title)}", entry.Value.Title)
                    .AddLiteralTriple($"{OWIDConstants.SymptomPrefix}:{nameof(TipsModel.Description)}", entry.Value.Description)
                    .Get()
                    .Execute(OWIDConstants.SymptomUri)
                    .ConfigureAwait(false);
            });

            await Task.WhenAll(tasks);

            Console.WriteLine("Complete.");
        }
    }
}

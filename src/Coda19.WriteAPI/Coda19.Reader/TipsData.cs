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
    public sealed class TipsData
    {
        private readonly string Path;

        public TipsData(string path)
        {
            Path = path;
        }

        public async Task Read()
        {
            var baseGraph = new Graph();
            baseGraph.NamespaceMap.AddNamespace(OWIDConstants.TipsPrefix, OWIDConstants.TipsUri);

            var data = JsonConvert.DeserializeObject<IDictionary<string, TipsModel>>(await File.ReadAllTextAsync(Path));

            var tasks = data.Select(async entry =>
            {
                await new SparqlUpdateBuilder(baseGraph)
                    .AddSubject($"{OWIDConstants.TipsPrefix}:{entry.Key}")
                    .AddLiteralTriple($"{OWIDConstants.TipsPrefix}:{nameof(TipsModel.Title)}", entry.Value.Title)
                    .AddLiteralTriple($"{OWIDConstants.TipsPrefix}:{nameof(TipsModel.Description)}", entry.Value.Description)
                    .Get()
                    .Execute(OWIDConstants.TipsUri)
                    .ConfigureAwait(false);
            });

            await Task.WhenAll(tasks);

            Console.WriteLine("Complete.");
        }
    }
}

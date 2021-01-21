using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Coda19.Core.OWID;
using VDS.RDF;
using VDS.RDF.Storage;

namespace Coda19.Core.SparqlRunner
{
    public sealed class SparqlCommandRunner : ISparqlCommandRunner
    {
        private readonly IEnumerable<Triple> _adds;
        private static SesameHttpProtocolConnector connector = new("http://localhost:7200", OWIDConstants.RepoId) { Timeout = int.MaxValue };

        public SparqlCommandRunner(IEnumerable<Triple> adds)
        {
            _adds = adds;
        }

        public Task Execute(Uri graph) => Task.Run(() => connector.UpdateGraph(graph, _adds, null));
    }
}
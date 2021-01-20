using System.Collections.Generic;
using VDS.RDF;
using VDS.RDF.Nodes;

namespace Coda19.Reader
{
    public sealed class SparqlUpdateBuilder
    {
        private readonly List<Triple> triples = new List<Triple>();
        private readonly IGraph _graph;

        private INode _subject;

        public SparqlUpdateBuilder(IGraph graph)
        {
            this._graph = graph;
        }

        public SparqlUpdateBuilder AddSubject(string value)
        {
            _subject = _graph.CreateUriNode(value);
            return this;
        }

        public SparqlUpdateBuilder AddLink(string predicate, string value)
        {
            if (value != null)
            {
                triples.Add(new Triple(_subject, _graph.CreateUriNode(predicate), _graph.CreateUriNode(value)));
            }

            return this;
        }

        public SparqlUpdateBuilder AddLiteralTriple(string predicate, string value)
        {
            if (value != null)
            {
                triples.Add(new Triple(_subject, _graph.CreateUriNode(predicate), _graph.CreateLiteralNode(value)));
            }

            return this;
        }

        public SparqlUpdateBuilder AddLiteralTriple(string predicate, decimal? value)
        {
            if (value.HasValue)
            {
                triples.Add(new Triple(_subject, _graph.CreateUriNode(predicate), new DecimalNode(_graph, value.Value)));
            }

            return this;
        }

        public SparqlUpdateBuilder AddLiteralTriple(string predicate, long? value)
        {
            if (value.HasValue)
            {
                triples.Add(new Triple(_subject, _graph.CreateUriNode(predicate), new LongNode(_graph, value.Value)));
            }

            return this;
        }

        public IEnumerable<Triple> Get() => triples;
    }
}
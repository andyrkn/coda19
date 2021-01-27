using System;
using System.Collections.Generic;
using Coda19.Core.SparqlRunner;
using VDS.RDF;
using VDS.RDF.Nodes;

namespace Coda19.Core.SparqlBuilder
{
    public sealed class SparqlUpdateBuilder
    {
        private readonly List<Triple> triples = new();
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
                triples.Add(new Triple(_subject, _graph.CreateUriNode(predicate), new StringNode(_graph, value)));
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

        public SparqlUpdateBuilder AddLiteralTriple(string predicate, DateTime? value)
        {
            if (value.HasValue)
            {
                triples.Add(new Triple(_subject, _graph.CreateUriNode(predicate), new DateNode(_graph, value.Value)));
            }

            return this;
        }

        public ISparqlCommandRunner Get() => new SparqlCommandRunner(triples);

        public IEnumerable<Triple> GetTriples() => triples;
    }
}
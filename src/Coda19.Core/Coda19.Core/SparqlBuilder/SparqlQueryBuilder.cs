using System;
using System.Collections.Generic;
using System.Text;
using Coda19.Core.OWID;
using Coda19.Core.SparqlRunner;

namespace Coda19.Core.SparqlBuilder
{
    public sealed class SparqlQueryBuilder
    {
        private int _skip = 0;
        private int _take = 100;

        private readonly StringBuilder _sb = new StringBuilder();
        private IList<string> _prefixes = new List<string>();
        private readonly IList<string> _subjects = new List<string>();
        private readonly string _subject = "?any";
        private readonly string _prefix;

        public SparqlQueryBuilder(string prefix)
        {
            _prefix = prefix;
            _subjects.Add($" {_subject}");
        }

        public SparqlQueryBuilder(string prefix, string subject)
        {
            _prefix = prefix;
            _subject = $"?{subject}";
            _subjects.Add($" {_subject}");
        }

        public SparqlQueryBuilder AddOWidPrefixes()
        {
            _prefixes.Add($"PREFIX {OWIDConstants.DatePrefix}:<{OWIDConstants.DateUri}>");
            _prefixes.Add($"PREFIX {OWIDConstants.LocationPrefix}:<{OWIDConstants.LocationUri}>");
            _prefixes.Add($"PREFIX {OWIDConstants.EventsPrefix}:<{OWIDConstants.EventsUri}>");
            return this;
        }

        public SparqlQueryBuilder AddPrefix(string prefix, Uri uri)
        {
            _prefixes.Add($"PREFIX {prefix}: {uri}");
            return this;
        }

        public SparqlQueryBuilder IncludeLiteral(string literal) => AddLiteral(literal, literal);

        public SparqlQueryBuilder AddLiteral(string literal, string predicate)
        {
            if (literal != null)
            {
                _subjects.Add($" ?{literal}");
                _sb.AppendLine($"{_subject} {_prefix}:{predicate} ?{literal} .");
            }

            return this;
        }

        public SparqlQueryBuilder AddValuedLiteral(string literal, string predicate, string value)
        {
            if (literal != null && value != null)
            {
                _sb.AppendLine($"{_subject} {_prefix}:{predicate} \"{value}\" .");
            }

            return this;
        }

        public SparqlQueryBuilder AddValuedLiteral(string literal, string predicate, decimal? value)
        {
            if (literal != null && value.HasValue)
            {
                _sb.AppendLine($"{_subject} {_prefix}:{predicate} {value} .");
            }

            return this;
        }

        public SparqlQueryBuilder AddValuedLiteral(string literal, string predicate, long? value)
        {
            if (literal != null && value.HasValue)
            {
                _sb.AppendLine($"{_subject} {_prefix}:{predicate} {value} .");
            }

            return this;
        }

        public SparqlQueryBuilder AddValuedLiteral(string literal, string predicate, DateTime? value)
        {
            if (literal != null && value.HasValue)
            {
                _sb.AppendLine($"{_subject} {_prefix}:{predicate} \"{value.Value:yyyy-MM-dd}\"^^xsd:date .");
            }

            return this;
        }
        
        public ISparqlQueryRunner Build()
        {
            var prefixes = $"{string.Join("\r\n", _prefixes)}\r\n";
            var select = $"SELECT{string.Join(string.Empty, _subjects)}\r\nWHERE {{\r\n";
            var clauses = _sb.ToString();
            return new SparqlQueryRunner($"{prefixes}{select}{clauses}}}\r\nLIMIT {_take}\r\nOFFSET {_skip}", _skip, _take);
        }

    }
}
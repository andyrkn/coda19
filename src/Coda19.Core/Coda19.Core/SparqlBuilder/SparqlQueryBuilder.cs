using System;
using System.Collections.Generic;
using System.Text;
using Coda19.Core.OWID;
using Coda19.Core.SparqlRunner;

namespace Coda19.Core.SparqlBuilder
{
    public partial class SparqlQueryBuilder
    {
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

        public SparqlQueryBuilder UseSubject(string subject)
        {
            _subject = $"?{subject}";
            return this;
        }

        public SparqlQueryBuilder AddSubject(string subject)
        {
            _subjects.Add($" ?{subject}");
            return this;
        }

        public SparqlQueryBuilder AddDefaultSubject()
        {
            _subjects.Add(" ?any");
            return this;
        }

        public SparqlQueryBuilder UseDefaultSubject()
        {
            _subject = "?any";
            return this;
        }

        public SparqlQueryBuilder AddLiteral(string literal) 
            => AddLiteral(literal, literal);

        public SparqlQueryBuilder AddLiteral(string literal, string predicate)
        {
            if (literal != null)
            {
                _subjects.Add($" ?{literal}");
                _sb.AppendLine($"{_subject} {_prefix}:{predicate} ?{literal} .");
            }

            return this;
        }

        public SparqlQueryBuilder UseLiteral(string literal)
        {
            _sb.AppendLine($"{_subject} {_prefix}:{literal} ?{literal} .");
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

        public SparqlQueryBuilder AddTriple(string triple)
        {
            _sb.AppendLine(triple);
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

        public SparqlQueryBuilder AddLink(string link, string prefix, string predicate, string linkValue)
        {
            _sb.AppendLine($"{_subject} {_prefix}:{link} [{prefix}:{predicate} ?{linkValue}] .");
            return this;
        }
    }
}
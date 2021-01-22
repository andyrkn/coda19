using System;

namespace Coda19.Core.SparqlBuilder
{
    public partial class SparqlQueryBuilder
    {
        public SparqlQueryBuilder Sum(string subject)
        {
            _sumTransforms.Add($"?{subject}1", $"?{subject}");
            _sb.AppendLine($"{_subject} {_prefix}:{subject} ?{subject}1 .");
            return this;
        }

        public SparqlQueryBuilder FilterGreaterThan(string subject, DateTime? value)
        {
            if (value.HasValue)
            {
                _sb.AppendLine($"FILTER (?{subject} > \"{value.Value:yyyy-MM-dd}\"^^xsd:date) .");
            }

            return this;
        }

        public SparqlQueryBuilder GroupBy(string subject)
        {
            _groupBy = $"GROUP BY ?{subject}\r\n";
            return this;
        }

        public SparqlQueryBuilder OrderBy(string subject, bool desc = false)
        {
            _orderBy = $"ORDER BY {(desc ? $"DESC(?{subject})" : $"?{subject}")}\r\n";
            return this;
        }

        public SparqlQueryBuilder Paginate(int skip, int take)
        {
            _skip = skip;
            _take = take;
            return this;
        }
    }
}
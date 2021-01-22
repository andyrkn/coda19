using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Coda19.Core.SparqlRunner;

namespace Coda19.Core.SparqlBuilder
{
    public partial class SparqlQueryBuilder
    {
        private int _skip = 0;
        private int _take = 100;

        private readonly StringBuilder _sb = new StringBuilder();
        private IList<string> _prefixes = new List<string>();
        private readonly IDictionary<string, string> _sumTransforms = new Dictionary<string, string>();
        private readonly IList<string> _subjects = new List<string>();
        private string _subject = "?any";
        private readonly string _prefix;
        private string _groupBy = string.Empty;
        private string _orderBy = string.Empty;

        public SparqlQueryBuilder(string prefix)
        {
            _prefix = prefix;
        }

        public ISparqlQueryRunner Build()
        {
            var s_subjects = string.Join(string.Empty, _subjects);
            var c_subjects = string.Join(string.Empty, _sumTransforms.Select(kvp => $" (sum({kvp.Key}) as {kvp.Value})"));
            var f_subjects = $"{s_subjects}{c_subjects}";

            var prefixes = $"{string.Join("\r\n", _prefixes)}\r\n";
            var select = $"SELECT{f_subjects}\r\nWHERE {{\r\n";
            var clauses = _sb.ToString();
            return new SparqlQueryRunner($"{prefixes}{select}{clauses}}}\r\n{_groupBy}{_orderBy}LIMIT {_take}\r\nOFFSET {_skip}", _skip, _take);
        }
    }
}
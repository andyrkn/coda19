using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using VDS.RDF.Query;

namespace Coda19.Core.SparqlRunner
{
    public sealed class SparqlQueryRunner : ISparqlQueryRunner
    {
        private readonly string _query;
        private readonly int _skip;
        private readonly int _take;

        private static readonly SparqlRemoteEndpoint endpoint = new(new Uri("http://localhost:7200/repositories/owid"));

        public SparqlQueryRunner(string query, int skip, int take)
        {
            _query = query;
            _skip = skip;
            _take = take;
        }

        public async Task<string> RunRaw()
        {
            try
            {
                var result = await Task.Run(() => endpoint.QueryWithResultSet(_query));
                return $"[{string.Join(",", result.Select(resultSet => $"{{{string.Join(",", resultSet.Select(pair => $"\"{pair.Key}\":\"{pair.Value}\""))}}}"))}]";
            }
            catch (Exception ex)
            {
                throw new Exception(_query, ex);
            }
        }

        public async Task<PaginatedList<T>> Run<T>()
        {
            try
            {
                var end = await RunRaw();
                var results = JsonConvert.DeserializeObject<IList<T>>(end);
                var page = _skip == 0 ? 0 : _skip / _take;

                return new PaginatedList<T>(page, _take, results.Count, results);
            }
            catch (Exception ex)
            {
                throw new Exception(_query, ex);
            }
        }

        public string Query => _query;
    }
}
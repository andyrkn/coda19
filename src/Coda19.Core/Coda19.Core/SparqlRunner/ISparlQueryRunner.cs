using System.Threading.Tasks;

namespace Coda19.Core.SparqlRunner
{
    public interface ISparqlQueryRunner
    {
        public Task<string> RunRaw();

        public Task<string> RunRawRandomResult();

        public Task<PaginatedList<T>> Run<T>();
        public string Query { get; }
    }
}
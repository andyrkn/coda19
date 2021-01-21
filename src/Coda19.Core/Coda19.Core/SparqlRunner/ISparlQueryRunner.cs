using System.Threading.Tasks;

namespace Coda19.Core.SparqlRunner
{
    public interface ISparqlQueryRunner
    {
        public Task<PaginatedList<T>> Run<T>();
        public string Query { get; }
    }
}
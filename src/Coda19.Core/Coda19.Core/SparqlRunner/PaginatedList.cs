using System.Collections.Generic;

namespace Coda19.Core.SparqlRunner
{
    public sealed class PaginatedList<T>
    {
        public PaginatedList(int pageNumber, int pageSize, int count, IEnumerable<T> records)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            Count = count;
            Records = records;
        }

        public int PageNumber { get; private set; }
        public int PageSize { get; private set; }
        public int Count { get; private set; }
        public IEnumerable<T> Records { get; private set; }
    }
}
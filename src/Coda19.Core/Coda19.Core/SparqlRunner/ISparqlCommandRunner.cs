using System;
using System.Threading.Tasks;

namespace Coda19.Core.SparqlRunner
{
    public interface ISparqlCommandRunner
    {
        Task Execute(Uri graph);
    }
}
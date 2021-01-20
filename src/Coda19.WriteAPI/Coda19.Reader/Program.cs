using System.Threading.Tasks;

namespace Coda19.Reader
{
    public sealed class Program
    {
        public static async Task Main(string[] args)
        {
            switch (1)
            {
                case 1: await new OurWorldInData().Read(); break;
            }
        }
    }
}

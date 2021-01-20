using System;
using System.Threading.Tasks;

namespace Coda19.Reader
{
    public sealed class Program
    {
        public static async Task Main(string[] args)
        {
            /*
             * INPUT: case, filePath
             * case1: OWID
             */
            switch (Convert.ToInt32(args[0]))
            {
                case 1: await new OurWorldInData(args[1]).Read(); break;
                default:break;
            }
        }
    }
}

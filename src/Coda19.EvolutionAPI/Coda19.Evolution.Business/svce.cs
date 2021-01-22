using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Coda19.Evolution.Business
{
    public static class svce
    {
        public static IServiceCollection AddBusiness(this IServiceCollection services)
            => services.AddMediatR(typeof(svce).Assembly);
    }
}
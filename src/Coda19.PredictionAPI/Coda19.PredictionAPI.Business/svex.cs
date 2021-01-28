using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Coda19.PredictionAPI.Business
{
    public static class svex
    {
        public static IServiceCollection AddBusiness(this IServiceCollection services)
            => services.AddMediatR(typeof(svex).Assembly);
    }
}
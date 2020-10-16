
namespace shane_personal_react.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using shane_personal_react.Models;

    public interface ICosmosDbService
    {
        Task<IEnumerable<Light>> GetLightsAsync(string query);
        Task<Light> GetLightAsync(string id);
        Task AddLightAsync(Light light);
        Task UpdateLightAsync(string id, Light light);
        Task DeleteLightAsync(string id);
    }
}
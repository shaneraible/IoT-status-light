namespace shane_personal_react
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.Azure.Cosmos;
    using Microsoft.Azure.Cosmos.Fluent;
    using Microsoft.Extensions.Configuration;
    using shane_personal_react.Models;
    using shane_personal_react.Services;


    public class CosmosDbService : ICosmosDbService
    {
        private Container _container;

        public CosmosDbService(
            CosmosClient dbClient,
            string databaseName,
            string containerName)
        {
            this._container = dbClient.GetContainer(databaseName, containerName);
        }

        public async Task AddLightAsync(Light light)
        {
            await this._container.CreateItemAsync<Light>(light, new PartitionKey(light.Id));
        }

        public async Task DeleteLightAsync(string id)
        {
            await this._container.DeleteItemAsync<Light>(id, new PartitionKey(id));
        }

        public async Task<Light> GetLightAsync(string id)
        {
            try
            {
                ItemResponse<Light> response = await this._container.ReadItemAsync<Light>(id, new PartitionKey(id));
                return response.Resource;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }

        }

        public async Task<IEnumerable<Light>> GetLightsAsync(string queryString)
        {
            var query = this._container.GetItemQueryIterator<Light>(new QueryDefinition(queryString));
            List<Light> results = new List<Light>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();

                results.AddRange(response.ToList());
            }

            return results;
        }

        public async Task UpdateLightAsync(string id, Light Light)
        {
            await this._container.UpsertItemAsync<Light>(Light, new PartitionKey(id));
        }
    }
}

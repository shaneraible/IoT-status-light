using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Configuration;
using System.Net;
using Microsoft.Azure.Cosmos;

namespace shane_personal_react
{
    public class Program
    {
        private static readonly string EndpointUri = "https://statuslight.documents.azure.com:443/";
        private static readonly string PrimaryKey = "2fZIOAwWv200yehiFmu0jhHTNQpz9fdWrwOd8EoKoRqrVJQNiO1QZbSlTitfd1iPSpp7xRl8Kj75mzdNDd6eqw==";
        private CosmosClient cosmosClient;
        private Database database;
        private Container container;
        private string databaseId = "doorbell";
        private string containerId = "iot";

        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}

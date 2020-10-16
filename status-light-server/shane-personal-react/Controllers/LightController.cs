namespace shane_personal_react.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using shane_personal_react.Models;
    using shane_personal_react.Services;
    using Newtonsoft.Json.Linq;

    public class LightController : ControllerBase
    {
        private readonly ICosmosDbService _cosmosDbService;

        public LightController(ICosmosDbService cosmosDbService)
        {
            _cosmosDbService = cosmosDbService;
        }

        [HttpGet]
        public string Get(string id="bedroom")
        {
            JObject light = new JObject();
            light.Add("id", "bedroom");
            light.Add("status", "busy");
            light.Add("color", "#332322");
            light.Add("ring", false);


            return light.ToString();
        }
    }
}

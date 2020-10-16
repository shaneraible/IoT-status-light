using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace shane_personal_react.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StatusLightController : ControllerBase
    {
        public StatusLightController()
        {
            
        }

        [HttpGet]
        public string Get()
        {
            return "poop";
        }

        [HttpPost]
        public string Post()
        {
            return "poop";
        }
    }
}

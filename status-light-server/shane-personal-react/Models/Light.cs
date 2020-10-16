namespace shane_personal_react.Models
{
    using Newtonsoft.Json;

    public class Light
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "status")]
        public string Status { get; set; }

        [JsonProperty(PropertyName = "color")]
        public string Color { get; set; }

        [JsonProperty(PropertyName = "ring")]
        public bool Ring { get; set; }
    }
}

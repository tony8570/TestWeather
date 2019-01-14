using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WeatherChallenge.Extensions;

namespace WeatherChallenge.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        string Api = "b055d1608344429ca186849841c1facd";

        [HttpGet("city")]
        public IActionResult GetCity()
        {
            List<string> city = new List<string>(new string[] { "Obregon", "Navojoa", "Hermosillo","Nogales" });

            return new OkObjectResult(city);
        }


        [HttpGet("temperature")]
        public IActionResult GetTemperature()
        {
            List<string> temp = new List<string>(new string[] { "Celsius", "Fahrenheit" });

            return new OkObjectResult(temp);
        }

        [HttpGet("apiwatherdata")]
        public IActionResult Getapiwatherdata(string city, string tempType, string date)
        {

            List<DtoTempDays> valueTemp = new List<DtoTempDays>();
            try
            {
                
                DateTime dateStart = DateTime.ParseExact(date,
                                   "dd-MM-yyyy",
                                   CultureInfo.InvariantCulture);
                DateTime dateEnd = dateStart.AddDays(-15);

                var jsonApi = HttpGet("https://api.weatherbit.io/v2.0/history/energy?&city=" + city +
                    "&start_date=" + dateEnd.ToString("yyyy-MM-dd") +
                    "&end_date=" + dateStart.ToString("yyyy-MM-dd") +
                    "&threshold=63&units=" + tempType +
                    "&key=" + Api + "&tp=daily");

                dynamic jsonObj = JsonConvert.DeserializeObject(jsonApi);

                foreach (var obj in jsonObj.data)
                {
                    Console.WriteLine(obj.temp.Value);
                    DtoTempDays day = new DtoTempDays();
                    day.temp = obj.temp.Value;
                    day.Date = obj.date.Value;
                    valueTemp.Add(day);
                }
            }catch (Exception e)
            {

            }

            return new OkObjectResult(valueTemp);
        }

        public string HttpGet(string url)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();

            try
            {
                using (Stream stream = response.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(stream);

                    return reader.ReadToEnd();
                }
            }
            finally
            {
                response.Close();
            }
        }

    }
}

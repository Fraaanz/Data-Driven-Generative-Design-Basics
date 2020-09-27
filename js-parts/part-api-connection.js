// 📡 API CONNECTION ----------------------------------------

var request = new XMLHttpRequest()

request.open('GET', 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=34&lon=50', true)
request.onload = function () {
  // Begin accessing JSON data here
  var apiData = JSON.parse(this.response)
  console.log(apiData);
  console.log(apiData.properties.timeseries[0].time);
  console.log(apiData.properties.timeseries[0].data.instant.details.air_temperature);
  console.log(apiData.properties.timeseries[91].time);
  console.log(apiData.properties.timeseries[91].data.instant.details.air_temperature);
}

request.send()
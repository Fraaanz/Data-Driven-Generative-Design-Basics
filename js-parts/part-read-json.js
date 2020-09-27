// 📊 LOAD JSON DATA ----------------------------------------
// Do not forget to load the D3 Framework in your HTML file!

d3.json("../sources/demo-data/weather.json").then(function (data) {
  console.log(data);
  console.log(data.properties.timeseries[0].time);
  console.log(data.properties.timeseries[0].data.instant.details.air_temperature);
  console.log(data.properties.timeseries[91].time);
  console.log(data.properties.timeseries[91].data.instant.details.air_temperature);
});
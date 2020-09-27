// 📊 LOAD XML DATA ----------------------------------------
// Do not forget to load the D3 Framework in your HTML file!

d3.xml("../sources/demo-data/HealthData-StepCount-Demo.xml").then(function (data) {
  var xml = data.documentElement.getElementsByTagName("Record");
  console.log(xml);
  console.log(xml.innerHTML = xml[1].getAttribute("value"));
});
// 📊 LOAD CSV DATA ----------------------------------------
// Do not forget to load the D3 Framework in your HTML file!

d3.csv("../sources/demo-data/dwd-demo-data-small.csv").then(function (data) {
  
  // Display table in console
  console.table(data);

  // Output the value of a cell from a specific row and column.
  // tablename[row]['column'];
  // Note: The first row has the number "0".
  var theValue = data[1]["LON"];
  console.log('💚 My value: ' + theValue);

});
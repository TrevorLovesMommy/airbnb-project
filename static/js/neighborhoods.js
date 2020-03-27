// api url found http://127.0.0.1:5000/api/v1.0/neighborhoods";
// d3 tag is id="neighborhoods" for the chart
// d3 tag is id="selNeighborhood" for the pulldown

//we are still pending cleaned data, but you have enough dummy data to start coding
//placeholder code below is to test/confirm d3 is working

console.log("neighborhood.js successfully called from static/js!")

d3.select("#neighborhoods").text("Hey, I changed this text with d3 from neighborhoods.js");

d3.json("/api/v1.0/neighborhoods").then(function(data) {
  console.log(data);
})
.catch(function(error) {
  console.log("error in d3.json");
});


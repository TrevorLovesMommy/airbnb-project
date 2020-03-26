// api url found http://127.0.0.1:5000/api/v1.0/mapping";
// d3 tag is id = #mapping

//Ilya - you also have a config.js in this same folder for you API key

console.log("mapping.js successfully called from static/js folder!")

d3.select("#mapping").text("Hey, I changed this text with d3 from mapping.js");

// d3.json("/api/v1.0/mapping").then(function(data) {
//     console.log(data);
//     console.log("in the d3.json function");
//   })
//   .catch(function(error) {
//     console.log("error in d3.json");
//   });
  




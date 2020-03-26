// // copy quandle example
// var = "http://127.0.0.1:5000/api/v1.0/legal_illegal";


// function buildPlot() {
//   d3.json(url).then(function(data){
//     console.log(data);
//   })
// };  

console.log("legal.js successfully called from static/js folder!")

d3.select("#roomtype").text("Hey, I changed this text with d3 from legal.js");

d3.json("/api/v1.0/legal_illegal").then(function(data) {
  console.log(data);
})
.catch(function(error) {
  console.log("error in d3.json");
});


// d3.json("http://127.0.0.1:5000/api/v1.0/legal_illegal").then(function(data) {
//     console.log(data);
//   })
//   .catch(function(error) {
//     console.log("error in d3.json");
//   });




// d3.json("/api/v1.0/legal_illegal").then(function(data) {
//     console.log("in the function");
  

  
// });

// const urlx = "https://api.spacexdata.com/v2/launchpads";
// // Fetch the JSON data and console log it
// d3.json(urlx).then(function(error,data) {
//  console.log(data);
// });
// // Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);
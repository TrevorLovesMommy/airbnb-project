// api url found http://127.0.0.1:5000/api/v1.0/roomtypes";
// d3 tag is id = #roomtype

//real data to be uploaded today


console.log("roomtype.js successfully called from static/js!")

d3.select("#roomtype").text("Hey, I changed this text with d3 from roomtype.js");

d3.json("/api/v1.0/roomtypes").then(function(data) {
  console.log(data);
})
.catch(function(error) {
  console.log("error in d3.json");
});


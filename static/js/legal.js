// api url found http://127.0.0.1:5000/api/v1.0/legal_illegal";
// d3 tag is id = "legalstatus"
// pending cleaned data from Yulia


console.log("legal.js successfully called from static/js folder!")

d3.select("#legalstatus").text("Hey, I changed this text with d3 from legal.js");

d3.json("/api/v1.0/legal_illegal").then(function(data) {
  console.log(data);
})
.catch(function(error) {
  console.log("error in d3.json");
});



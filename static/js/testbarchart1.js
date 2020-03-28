// api url found http://127.0.0.1:5000/api/v1.0/neighborhoods";
// d3 tag is id="neighborhoods" for the chart
// d3 tag is id="selNeighborhood" for the pulldown

//we are still pending cleaned data, but you have enough dummy data to start coding
//placeholder code below is to test/confirm d3 is working



//read newly reformatted data
d3.json("/api/v1.0/neighborhoods").then(function(neighborhoodData) {
  console.log("this is data from neighborhoods.js")  
  console.log(neighborhoodData);
  
  //we are plottong for the Mission neighborhood only.  Shayzee, for your code, this will be the value for the pulldown menu
  var selectedID = "Mission";

  //filter for Mission dictionary
  var filteredData = neighborhoodData.filter(d => d.neighbourhood_cleansed === selectedID);
  console.log("This is the filteredData output for the Mission");
  console.log(filteredData);


  //create an array for x axis to be used in all traces
  var xAxisLabels = ["Entire House/Apt", "Private Room"]

  // ------------- trace 1---------
  //Get number of entire house
  var entireHouseUnits = filteredData.map(d => d.entire_house);

  var trace1 = {
      x: xAxisLabels,
      y: entireHouseUnits,
      type: "bar"
  };

  // ------------- trace 2---------
  //Get number of private rooms
  var privateRoomUnits = filteredData.map(d => d.private_room);

  var trace2 = {
      x: xAxisLabels,
      y: privateRoomUnits,
      type: "bar"
  };

  // ------------- trace 3---------
  //Get number of shared rooms

  var sharedRoomUnits = filteredData.map(d => d.shared_room);

  var trace3 = {
      x: xAxisLabels,
      y: sharedRoomUnits,
     type: "bar"
  };

  // ------------- plot bar chart ---------

  var data = [trace1, trace2, trace3]

  var layout = {
      title: "Airbnb room type by neighborhood",
      xaxis: {title: "Room Type"},
     yaxis: {title: "Number of units"}
  };

  Plotly.newPlot("neighborhoods", data, layout);

});

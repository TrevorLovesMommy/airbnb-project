// api url found http://127.0.0.1:5000/api/v1.0/neighborhoods";
// d3 tag is id="neighborhoods" for the chart
// d3 tag is id="selNeighborhood" for the pulldown

//we are still pending cleaned data, but you have enough dummy data to start coding
//placeholder code below is to test/confirm d3 is working

function init() {
    // Use D3 to select the dropdown menu
      var dropdownMenu = d3.select("#selNeighborhood");
    
    //read newly reformatted data
    d3.json("/api/v1.0/neighborhoods").then(function(neighborhoodData) {
      console.log("this is data from neighborhoods.js")  
      console.log(neighborhoodData);
    
    // get the neighborhood data to the dropdwown menu
    neighborhoodData.forEach(function(d) {
        dropdownMenu.append("option").text(d.neighbourhood_cleansed).property("value");
        
         
    // Assign the value of the dropdown menu option to a variable
        var selectedID = dropdownMenu.property("value");
        console.log(selectedID);
        
     
      //filter for SF neighborhood 
      var filteredData = neighborhoodData.filter(d => d.neighbourhood_cleansed === selectedID);
      console.log("This is the filteredData output for the specific SF neighborhood below");
      console.log(filteredData);
    
      // get y axis data for Mission and convert from array to number
      var entireHouseUnits = filteredData.map(d => d.entire_house);
      var ehu=entireHouseUnits[0];
      console.log(ehu);
      var privateRoomUnits = filteredData.map(d => d.private_room);
      var pru=privateRoomUnits[0];
      console.log(pru);
      var sharedRoomUnits = filteredData.map(d => d.shared_room);
      var sru=sharedRoomUnits[0];
      console.log(sru);
    
      // ------------- plot bar chart ---------
      //create x axis and yaxis labels 
      var trace1 = {
          x: ['Entire Room', 'Private Room', 'Shared Room'],
          y: [ehu, pru, sru],
          type: 'bar'
      };
    
      var data = [trace1]
    
      var layout = {
          title: "Airbnb room type by neighborhood",
          xaxis: {title: "Room Type"},
         yaxis: {title: "Number of units"},
         bargap: 0.25
        
      };
    
      Plotly.newPlot("neighborhoods", data, layout);
    });
    
    // Call updatePlotly() when a change takes place on the page
    d3.selectAll("#selNeighborhood").on("change", updatePlotly);
    
    // This function is called when a dropdown menu item is selected
    function updatePlotly() {
        var dropdownMenu = d3.select("#selNeighborhood");
    // Assign the value of the dropdown menu option to a variable
    var selectedID = dropdownMenu.property("value");
    console.log(selectedID);
    
    //filter for SF neighborhood 
    var filteredData = neighborhoodData.filter(d => d.neighbourhood_cleansed === selectedID);
     
      // get y axis data for Mission and convert from array to number
      var entireHouseUnits = filteredData.map(d => d.entire_house);
      var ehu=entireHouseUnits[0];
      console.log(ehu);
      var privateRoomUnits = filteredData.map(d => d.private_room);
      var pru=privateRoomUnits[0];
      console.log(pru);
      var sharedRoomUnits = filteredData.map(d => d.shared_room);
      var sru=sharedRoomUnits[0];
      console.log(sru);
      
    
      var traceupdate = {
        x: ['Entire Room', 'Private Room', 'Shared Room'],
        y: [ehu, pru, sru],
        type: 'bar'
    };
    
    var dataupdate = [traceupdate]
    
    var layout = {
        title: "Airbnb room type by neighborhood",
        xaxis: {title: "Room Type"},
       yaxis: {title: "Number of units"},
       bargap: 0.25
      
    };
     
      Plotly.newPlot("neighborhoods", dataupdate, layout);
    
    }
    });
        
    }
    
    init();
    
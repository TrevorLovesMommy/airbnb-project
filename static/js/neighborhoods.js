
// api url found http://127.0.0.1:5000/api/v1.0/neighborhoods"
//  tag for the chart is  id="neighborhoods" 
// tag for the pulldown is  id="selNeighborhood" 


function getNeighborhoodInfo(neighborhood) {
    // read the data
    d3.json("/api/v1.0/neighborhoods").then((neighborhoodData) =>{
        console.log("neighborhood.js successfully called from static/js!")
        console.log(neighborhoodData); 
        // set initial parameters 
    
        var neighborhood = neighborhoodData[1];

        neighborhoodData.forEach(function(d){
            d.neigborhoodCount = +d.neigborhoodCount[0];
            d.neigborhoodRoomType= +d.neigborhoodRoomType[1];  
       
        console.log(neigborhoodCount);
        console.log(neigborhoodRoomType);
      
        // --------------------------------- plot bar chart -----------------------------------

        //create trace
        var trace = {
            x: neighborhoodRoomType,
            y: neighborhoodCount,
            //text: neighborhoodRoomType,
            type: "bar",
            orientation: "h"
        };
        // Create the data array for our plot
        var data = [trace];  

        //Define our plot layout
        var layout = {
          margin: {
            l: 75,
            r: 5,
            t: 5,
            b: 15
          }
        };
           
        //Plot the chart to a div tag with id "bar-plot"
           Plotly.newPlot("neighborhoods", data, layout);
        });
    });
}


    //Use D3 to create an event handler
    d3.selectAll("#selNeighborhood").on("change", optionChanged);

    function optionChanged(neighborhood) {
        //use D3 to select the dropdown menu
        var dropdownMenu = d3.selectAll("#selNeighborhood").node();
        //assign the dropdown menu item ID to a variable.  This is the parent node
        var dropdownMenuID = neighborhoodData.filter(meta => meta.neighborhoodData[1] === neighborhoodData)[1];
        //assign the dropdown menu option to a variable.  This is the child node
        var selectedID = dropdownMenu.value;

        console.log(dropdownMenuID); //result is selNeighborhood
        console.log(selectedID); //result is Mission, Nob Hill, etc.

        //filter neighborhoodData to get count and room type for SF neighborhood
        neighborhoodData.forEach(function(d){
        d.neigborhoodCount = +d.neigborhoodCount[0];
        d.neigborhoodRoomType= +d.neigborhoodRoomType[1];  
        });
    };

    function init() {
        // select dropdown menu 
        var dropdown = d3.select("#selNeighborhood");
      
        // read the data 
        d3.json("/api/v1.0/neighborhoods").then((neighborhoodData) => {
            console.log(neighborhoodData);
      
            //filter neighborhoodData to get count and room type for SF neighborhood
            neighborhoodData.forEach(function(d){
            d.neigborhoodCount = +d.neigborhoodCount[1];
            d.neigborhoodRoomType= +d.neigborhoodRoomType[2];  
        });
      
            // call the functions to display the data and the plots to the page
            getNeighborhoodInfo(neighborhood);
            optionChanged(neighborhood);
        });
      }
      
      init();
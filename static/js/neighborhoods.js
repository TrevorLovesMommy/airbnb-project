console.log("neighborhood.js successfully called from static/js!")
//  tag for the chart is  id="neighborhoods" 
// tag for the pulldown is  id="selNeighborhood" 

d3.json("/api/v1.0/neighborhoods").then(function(neighborhoodData) { 
    console.log(neighborhoodData); 
}); 
//Assign the data from data.js to a variable
//var neighborhoodData = data;
//get reference to the button with the id "filter-btn"
 var button = d3.select("#filter-btn");
// Get a reference to the table body
var tbody = d3.select("tbody");


//populate talble with Neighborhood data
function populateTable(info) {
    tbody.html("");
    console.log("in the populate table function");
    info.forEach(function(neighborhoodData){
        //use d3 to append one row per alien report
        console.log("appending row");
        var row = tbody.append("tr");
        //use d3 to append a cell for each value in the alien report object
        Object.entries(neighborhoodData).forEach(function([key,value]){
            var cell=row.append("td");
            //for every cell, pupluate the value
            cell.text(value);
        });
    });
}
//Initial population of data
populateTable(neighborhoodData);
//--------use the "on" function in d3 and inline function to record an event--------
button.on("click", function() {
    console.log("a button was clicked");
 
    //get a reference to the input element on the page with the class "form-control"
    var inputElement = d3.select(".form-control");
    console.log(inputElement);
    
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selNeighborhood");
    // Assign the value of the dropdown menu option to a variable
    var category = dropdownMenu.property("value");
    //console.log(here is the category ${category});
    //get the value property of the input element
    var inputValue = inputElement.property("value");
    //console.log(here's the input value ${inputValue});
    if (category === 'datetime') {
        var filteredData = neighborhoodData.filter(report => report.datetime === inputValue);
    }
    if (category === 'city') {
        var filteredData = neighborhoodData.filter(report => report.city === inputValue);
    }
    if (category === 'state') {
        var filteredData = neighborhoodData.filter(report => report.state === inputValue);
    }
    if (category === 'country') {
        var filteredData = neighborhoodData.filter(report => report.country === inputValue);
    }
    
    if (category === 'shape') {
        var filteredData = neighborhoodData.filter(report => report.shape === inputValue);
    }
    populateTable(filteredData);
}); 

//.catch(function(error) { console.log("error in d3.json"); });
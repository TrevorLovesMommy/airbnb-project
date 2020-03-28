/Assign the data from data.js to a variable
var tableData = data;
//get reference to the button with the id "filter-btn"
 var button = d3.select("#filter-btn");
// Get a reference to the table body
var tbody = d3.select("tbody");
//console log tableData
console.log(tableData);
//populate talble with UFO sightings
function populateTable(info) {
    tbody.html("");
    console.log("in the populate table function");
    info.forEach(function(alienReport){
        //use d3 to append one row per alien report
        console.log("appending row");
        var row = tbody.append("tr");
        //use d3 to append a cell for each value in the alien report object
        Object.entries(alienReport).forEach(function([key,value]){
            var cell=row.append("td");
            //for every cell, pupluate the value
            cell.text(value);
        });
    });
}
//Initial population of data
populateTable(tableData);
//--------use the "on" function in d3 and inline function to record an event--------
button.on("click", function() {
    console.log("a button was clicked");
 
    //get a reference to the input element on the page with the class "form-control"
    var inputElement = d3.select(".form-control");
    console.log(inputElement);
    
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var category = dropdownMenu.property("value");
    console.log(here is the category ${category});
    //get the value property of the input element
    var inputValue = inputElement.property("value");
    console.log(here's the input value ${inputValue});
    if (category === 'datetime') {
        var filteredData = tableData.filter(report => report.datetime === inputValue);
    }
    if (category === 'city') {
        var filteredData = tableData.filter(report => report.city === inputValue);
    }
    if (category === 'state') {
        var filteredData = tableData.filter(report => report.state === inputValue);
    }
    if (category === 'country') {
        var filteredData = tableData.filter(report => report.country === inputValue);
    }
    
    if (category === 'shape') {
        var filteredData = tableData.filter(report => report.shape === inputValue);
    }
    populateTable(filteredData);
}); (edited) 
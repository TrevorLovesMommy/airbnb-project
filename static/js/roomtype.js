// app route for jsonified data at http://127.0.0.1:5000/api/v1.0/roomtypes"


//global variables
//data for sfHousingStock from https://default.sfplanning.org/publications_reports/2018_Housing_Inventory.pdf
var sfHousingStock = 394615;
//two thirds of housing stock is used for long term rentals.  https://housing.datasf.org/overview/
var ltRentalStock = Math.round((sfHousingStock*2)/3);

console.log(sfHousingStock)
console.log(ltRentalStock)

//read jasonofied data from app route http://127.0.0.1:5000/api/v1.0/roomtypes
d3.json("/api/v1.0/roomtypes").then(function(data) {
  console.log("here is the data");
  console.log(data);

  var unitCount = data.map(d=>d.count);
  console.log(`this is the count ${unitCount}`);

  var entireHouseCount = unitCount[0];
  console.log(`this is the entirehouse count ${entireHouseCount}`) 

  var privateRoomCount = unitCount[1];
  console.log(`this is the privateroom count ${privateRoomCount}`) 

  var sharedRoomCount = unitCount[2];
  console.log(`this is the shared room count ${sharedRoomCount}`) 


  //Ask Justin how to make totalCount global so I can use it in legal.js
  var totalCount = entireHouseCount + privateRoomCount + sharedRoomCount;
  var chartTitle = (`Room Types on SF Airbnb (Total ${totalCount})`);

  //create room type chart
  //   * ---------------------------------------
  //   * This chart was created using Anychart.
  //   * 
  //   * For more information visit:
  //   * https://www.anychart.com/
  //   * ---------------------------------------

  anychart.onDocumentReady(function () {
  // data set
  var data = [
    {x: "Entire House/Apt", value: entireHouseCount},
    {x: "Private Room", value: privateRoomCount},
    {x: "Shared Room", value: sharedRoomCount},
  ];

  // create and configure a pie chart
  var chart1 = anychart.pie(data);
  chart1.innerRadius("75%");

  // create a bar chart
  var chart2 = anychart.bar(data);

  // set bar chart as the center content of a pie chart
  chart1.center().content(chart2);

  chart1.title(chartTitle);
  chart1.container("roomtype");
  chart1.draw();

  });

  //create chart comparing Airbnb Entire Home Listing to SF Long-term housing rental stock
  //   * ---------------------------------------
  //   * This chart was created using Anychart.
  //   * https://www.anychart.com/products/anychart/gallery/Column_Charts/Column_Chart.php
  //   * ---------------------------------------

  anychart.onDocumentReady(function () {
    // create column chart
    var chart = anychart.column();

    // turn on chart animation
    chart.animation(true);

    // set chart title text settings
    chart.title('Airbnb Entire Home/Apt compared to Long Term Rental Stock');

    // create area series with passed data
    var series = chart.column([
        // ['All SF Dwelling Units', sfHousingStock],
        ['Long-term Rental Stock', ltRentalStock],
        ['Airbnb Entire Home/Apt', entireHouseCount],
    ]);

    series.tooltip().enabled(true).title().enabled(true).text("Information:");
    series.labels().enabled(true).anchor("top-center").position("top-center").fontSize(13);


    // set scale minimum
    chart.yScale().minimum(0);

    // set yAxis labels formatter
    chart.yAxis().labels().format('{%Value}{groupsSeparator: }');

    // tooltips position and interactivity settings
    chart.tooltip().positionMode('point');
    chart.interactivity().hoverMode('by-x');

    // axes titles
    chart.xAxis().title('Housing categories');
    chart.yAxis().title('Number of units');

    // set container id for the chart
    chart.container('longtermrentals');

    // initiate chart drawing
    chart.draw();
});



});



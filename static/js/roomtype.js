// app route for jsonified data at http://127.0.0.1:5000/api/v1.0/roomtypes"

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

  var totalCount = entireHouseCount + privateRoomCount + sharedRoomCount;
  var chartTitle = (`Room Types on SF Airbnb (Total ${totalCount})`);
 
  //   * ---------------------------------------
  //   * This chart was created using Anychart.
  //   * 
  //   * For more information visit:
  //   * https://www.anychart.com/
  //   * ---------------------------------------

  anychart.onDocumentReady(function () {
  // data set
  var data = [
    {x: "Entire House", value: entireHouseCount},
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
});



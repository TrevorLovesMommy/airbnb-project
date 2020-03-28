// api url found http://127.0.0.1:5000/api/v1.0/roomtypes";
// d3 tag is id = #roomtype

//real data to be uploaded today


// console.log("roomtype.js successfully called from static/js!")

// d3.select("#roomtype").text("Hey, I changed this text with d3 from roomtype.js");

d3.json("/api/v1.0/roomtypes").then(function(data) {
  console.log("here is the data");
  console.log(data);

  var unitCount = data.map(d=>d.count);
  console.log("this is the count");
  console.log(unitCount);

  var entireHouseCount = unitCount[0];
  console.log(`this is the entirehouse count ${entireHouseCount}`) 

  var privateRoomCount = unitCount[1];
  console.log(`this is the privateroom count ${privateRoomCount}`) 

  var sharedRoomCount = unitCount[2];
  console.log(`this is the shared room count ${sharedRoomCount}`) 
 

  anychart.onDocumentReady(function () {
    // create pie chart with passed data
    var chart = anychart.pie([
        ['Entire House', entireHouseCount],
        ['Private Room', privateRoomCount],
        ['Shared Room', sharedRoomCount]
    ]);

    // set chart title text settings
    chart.title('ACME Corp. apparel sales through different retail channels')
            // create empty area in pie chart
            .innerRadius('40%');

    // set chart labels position to outside
    chart.labels().position('outside');

    // set container id for the chart
    chart.container('roomtype');
    // initiate chart drawing
    chart.draw();
});

  

});

  //   * ---------------------------------------
  //   * This chart was created using amCharts 4.
  //   * 
  //   * For more information visit:
  //   * https://www.amcharts.com/
  //   * 
  //   * Documentation is available at:
  //   * https://www.amcharts.com/docs/v4/
  //   * ---------------------------------------
  //   */


  // Themes begin
  // am4core.useTheme(am4themes_animated);
  // // Themes end

  // // Create chart instance
  // var chart = am4core.create("roomtype", am4charts.PieChart);

  // // Add and configure Series
  // var pieSeries = chart.series.push(new am4charts.PieSeries());
  // pieSeries.dataFields.value = "units";
  // pieSeries.dataFields.category = "roomtype";

  // // Let's cut a hole in our Pie chart the size of 30% the radius
  // chart.innerRadius = am4core.percent(30);

  // // Put a thick white border around each Slice
  // pieSeries.slices.template.stroke = am4core.color("#fff");
  // pieSeries.slices.template.strokeWidth = 2;
  // pieSeries.slices.template.strokeOpacity = 1;
  // pieSeries.slices.template
  //   // change the cursor on hover to make it apparent the object can be interacted with
  //   .cursorOverStyle = [
  //     {
  //       "property": "cursor",
  //       "value": "pointer"
  //     }
  //   ];

  // pieSeries.alignLabels = false;
  // pieSeries.labels.template.bent = true;
  // pieSeries.labels.template.radius = 3;
  // pieSeries.labels.template.padding(0,0,0,0);

  // pieSeries.ticks.template.disabled = true;

  // // Create a base filter effect (as if it's not there) for the hover to return to
  // var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
  // shadow.opacity = 0;

  // // Create hover state
  // var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

  // // Slightly shift the shadow and make it more prominent on hover
  // // var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
  // // hoverShadow.opacity = 0.7;
  // // hoverShadow.blur = 5;

  // // // Add a legend
  // // chart.legend = new am4charts.Legend();

  // // chart.data = [{
  // //   "roomtype": "Entire Home/Apt",
  // //   "units": entireHouseCount
  // // },   {
  // //   "roomtype": "Private Room",
  // //   "units": privateRoomCount
  // // }, {
  //   "roomtype": "Shared Room",
  //   "units": sharedRoomCount


  // }];

  






// // Themes begin
// am4core.useTheme(am4themes_animated);
// // Themes end

// // Create chart instance
// var chart = am4core.create("roomtype", am4charts.PieChart);

// // Add and configure Series
// var pieSeries = chart.series.push(new am4charts.PieSeries());
// pieSeries.dataFields.value = "units";
// pieSeries.dataFields.category = "roomtype";

// // Let's cut a hole in our Pie chart the size of 30% the radius
// chart.innerRadius = am4core.percent(30);

// // Put a thick white border around each Slice
// pieSeries.slices.template.stroke = am4core.color("#fff");
// pieSeries.slices.template.strokeWidth = 2;
// pieSeries.slices.template.strokeOpacity = 1;
// pieSeries.slices.template
//   // change the cursor on hover to make it apparent the object can be interacted with
//   .cursorOverStyle = [
//     {
//       "property": "cursor",
//       "value": "pointer"
//     }
//   ];

// pieSeries.alignLabels = false;
// pieSeries.labels.template.bent = true;
// pieSeries.labels.template.radius = 3;
// pieSeries.labels.template.padding(0,0,0,0);

// pieSeries.ticks.template.disabled = true;

// // Create a base filter effect (as if it's not there) for the hover to return to
// var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
// shadow.opacity = 0;

// // Create hover state
// var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

// // Slightly shift the shadow and make it more prominent on hover
// var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
// hoverShadow.opacity = 0.7;
// hoverShadow.blur = 5;

// // Add a legend
// chart.legend = new am4charts.Legend();

// chart.data = [{
//   "roomtype": "Entire Home/Apt",
//   "units": 600
// },   {
//   "roomtype": "Private Room",
//   "units": 300
// }, {
//   "roomtype": "Shared Room",
//   "units": 100
// }];
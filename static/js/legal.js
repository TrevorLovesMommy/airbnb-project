// api url for jsonified data at http://127.0.0.1:5000/api/v1.0/legal_illegal";

d3.json("/api/v1.0/legal_illegal").then(function(data) {
  console.log('here is the legal data');
  console.log(data);

  //filter for legal data
  var filteredLegal = data.filter(d => d.legal_illegal === "legal");
  var legalCount = filteredLegal.map(d => d.count);
  console.log(`legal count is ${legalCount}`);

  //filter for illegal data
  var filteredIllegal = data.filter(d => d.legal_illegal === "illegal");
  var illegalCount = filteredIllegal.map(d => d.count);
  console.log(`illegal count is ${illegalCount}`);

  //   * ---------------------------------------
  //   * This chart was created using Anychart.
  //   * 
  //   * For more information visit:
  //   * https://www.anychart.com/
  //   * ---------------------------------------

  anychart.onDocumentReady(function () {
    // create data set on our data
    var dataSet = anychart.data.set([
        ['units', 8461, 4861, illegalCount, legalCount],

    ]);

    // map data for the first series, take x from the zero column and value from the first column of data set
    var seriesData_1 = dataSet.mapAs({'x': 0, 'value': 1});

    // map data for the second series, take x from the zero column and value from the second column of data set
    var seriesData_2 = dataSet.mapAs({'x': 0, 'value': 2});

    // map data for the third series, take x from the zero column and value from the third column of data set
    var seriesData_3 = dataSet.mapAs({'x': 0, 'value': 3});

    // map data for the fourth series, take x from the zero column and value from the fourth column of data set
    var seriesData_4 = dataSet.mapAs({'x': 0, 'value': 4});

    // create bar chart
    var chart = anychart.bar();

    // turn on chart animation
    chart.animation(true);

    chart.padding([10, 40, 5, 20]);

    // set chart title text settings
    chart.title('Legal and Illegal Units Compared to Total Entire House/Apt');

    // set scale minimum
    chart.yScale().minimum(0);

    chart.xAxis().labels()
            .rotation(-90)
            .padding([0, 0, 20, 0]);

    chart.yAxis().labels().format('{%Value}{groupsSeparator: }');

    // set titles for Y-axis
    chart.yAxis().title('Listings');

    // helper function to setup settings for series
    var setupSeries = function (series, name) {
        series.name(name);
        series.hovered().labels(false);

        series.labels()
                .enabled(true)
                .position('right-center')
                .anchor('left-center');
                // .format('${%Value}{groupsSeparator: }');

        series.tooltip()
                .position('right')
                .anchor('left-center')
                .offsetX(5)
                .offsetY(0)
                .titleFormat('{%X}');
                // .format('{%SeriesName} : ${%Value}{groupsSeparator: }');
    };

    // temp variable to store series instance
    var series;

    // create first series with mapped data
    // series = chart.bar(seriesData_1);
    // setupSeries(series, 'Total Listings');

    // create second series with mapped data
    series = chart.bar(seriesData_2);
    setupSeries(series, 'Entire House/Apt');

    // create third series with mapped data
    series = chart.bar(seriesData_3);
    setupSeries(series, 'Illegal');

    // create fourth series with mapped data
    series = chart.bar(seriesData_4);
    setupSeries(series, 'Legal');

    // turn on legend
    chart.legend()
            .enabled(true)
            .fontSize(13)
            .padding([0, 0, 20, 0]);

    chart.interactivity().hoverMode('single');
    chart.tooltip().positionMode('point');

    // enable categorizedBySeries mode
    chart.categorizedBySeries(true);

    // set container id for the chart
    chart.container('legalstatus');
    // initiate chart drawing
    chart.draw();
  });

})
.catch(function(error) {
  console.log("error in d3.json");
});


// ------------------------------- Neighborhood Scrolling Table ----------------------

var tbody = d3.select("tbody"); 

d3.json("/api/v1.0/neighborhoods").then(function(tabledata) {
  console.log('here is the neighborhood data from legal.js');
  console.log(tabledata);

  tbody.html("");
  console.log("in the populate table function");
  tabledata.forEach(function(d){
      //use d3 to append one row for each object in tabledata
      var row = tbody.append("tr");
      //use d3 to append a cell for each entry (key.object pair) for an tabledata object
      var obj = Object.values(d);  //array of values in each rows
      //switch column 1 and 2 because Jsonified data orders the key/values alphabetically
      //we removed and stored index 1 (column2) and change original pop out neighborhood column
      var item2 = obj.splice(1,1)[0];  
      //puts back in the first position, the beginning of the aray (colum1)
      obj.unshift(item2); 

      obj.forEach(function(value){
          var cell=row.append("td");
          //for every cell, popluate the value as text
          cell.text(value);
      });
  });



})


console.log("roomtype.js successfully called from static/js!")

d3.select("#mapping").text("Hey, I changed this text with d3 from mapping.js");

d3.json("/api/v1.0/neighborhoods").then(function(ndata) {
  console.log("group neighborhood data here:")
  console.log(ndata);
})
.catch(function(error) {
  console.log("error in d3.json");
});




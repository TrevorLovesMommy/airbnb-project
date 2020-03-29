// api url found http://127.0.0.1:5000/api/v1.0/legal_illegal";
// d3 tag is id = "legalstatus"
// pending cleaned data from Yulia


console.log("legal.js successfully called from static/js folder!")



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
        ['units', 8472, 4822, 3846, 976],
        // ['units', 6814, 3054, 4376, 4229],
        // ['Eyebrow pencil', 7012, 5067, 8987, 3932],
        // ['Lipstick', 8814, 9054, 4376, 9256]
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
    chart.title('Legal and Illegal units compared to Total Listing and # of Entire Homes');

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
    series = chart.bar(seriesData_1);
    setupSeries(series, 'Total Listings');

    // create second series with mapped data
    series = chart.bar(seriesData_2);
    setupSeries(series, 'Entire Homes');

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




var url = "http://127.0.0.1:5000/api/v1.0/legal_illegal";


console.log("legal.js successfully called!")

function buildPlot() {
    d3.json(url).then(function(data) {

    console.log("in the function");
  
      // Grab values from the data json object to build the plots
    //   var name = data.dataset.name;
    //   var stock = data.dataset.dataset_code;

    //   var closingPrices = unpack(data.dataset.data, 4);
  
    //   var trace1 = {
    //     type: "scatter",
    //     mode: "lines",
    //     name: name,
    //     x: dates,
    //     y: closingPrices,
    //     line: {
    //       color: "#17BECF"
    //     }
    //   };
  
    //   var data = [trace1];
  
    //   var layout = {
    //     title: `${stock} closing prices`,
    //     xaxis: {
    //       range: [startDate, endDate],
    //       type: "date"
    //     },
    //     yaxis: {
    //       autorange: true,
    //       type: "linear"
    //     }
    //   };
  
    //   Plotly.newPlot("plot", data, layout);
  
    });
  }
  
   

console.log("calling buildplot function")
buildPlot();


// api url found http://127.0.0.1:5000/api/v1.0/mapping";

d3.json("/api/v1.0/mapping").then(function(data) {
  console.log(data);
  createFeatures(data)
});
// .catch(function(error) {
//   console.log(error);
// });

function createFeatures(mapData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeatureFunction(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.name +
      "</h3><hr><p>" + feature.properties.neighbourhood + "</p></p>" + feature.properties.room_type + "</p></p>" + feature.properties.legal_status + "</p>");
  }

  function style(){
    return {
      color: "red"
    }
  }

  var legal = mapData.filter(obj=>obj.properties.legal_status==="legal")
  var illegal = mapData.filter(obj=>obj.properties.legal_status==="illegal")

  var airbnb = {}
    airbnb.legal = L.geoJSON(legal, {
    onEachFeature: onEachFeatureFunction
  });

    airbnb.illegal = L.geoJSON(illegal, {
    onEachFeature: onEachFeatureFunction, 
      style:style
  });

  // Create a GeoJSON layer containing the features array on the mapData object
  // Run the onEachFeature function once for each piece of data in the array
  // var airbnb = L.geoJSON(mapData, {
  //   onEachFeature: onEachFeatureFunction
  // });

  // Sending our airbnb layer to the createMap function
  createMap(airbnb);
}

function createMap(airbnb) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "Airbnb Legal": airbnb.legal,
    "Airbnb Illegal": airbnb.illegal
  };

  // Create our map, giving it the streetmap and airbnb layers to display on load
  var myMap = L.map("map", {
    center: [
      37.77, -122.43
    ],
    zoom: 18,
    layers: [streetmap, airbnb.legal, airbnb.illegal]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
// LSR-go
//
// Written by: Michael Culpepper
//
// This map code is interactive. A user is given information based on their location. A user can
// also find information on other geozones in the state.
//
//

// element to variable
var x = document.getElementById("demo");
var INFO = document.getElementById("outInfo");
var INFOB = document.getElementById("outInfo-right");

//map
var map = new GMaps({

        el: '#map',

        lat: 31.13777,

        lng: -91.86493,
		
		center: new google.maps.LatLng(31.306715155075167,-91.812744140625),
		
		draggable: true,
		
		minZoom: 6,

		zoom: 6,

		mapTypeId: google.maps.MapTypeId.HYBRID

      });
// LA zoom restriction
	  var strictBounds = new google.maps.LatLngBounds(
     new google.maps.LatLng(33.146750228776455,-89.176025390625), 
     new google.maps.LatLng(29.401319510041485,-94.251708984375)
   );

   // Listen for the dragend event
   google.maps.event.addListener(map, 'dragend', function() {
     if (strictBounds.contains(map.getCenter())) return;

     // We're out of bounds - Move the map back within the bounds

     var c = map.getCenter(),
         x = c.lng(),
         y = c.lat(),
         maxX = strictBounds.getNorthEast().lng(),
         maxY = strictBounds.getNorthEast().lat(),
         minX = strictBounds.getSouthWest().lng(),
         minY = strictBounds.getSouthWest().lat();

     if (x < minX) x = minX;
     if (x > maxX) x = maxX;
     if (y < minY) y = minY;
     if (y > maxY) y = maxY;

     map.setCenter(new google.maps.LatLng(y, x));
   });

   // Limit the zoom level
   google.maps.event.addListener(map, 'zoom_changed', function() {
     if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
   });
// gets user location. Displays output
function getLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(showPosition);

    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

}



function showPosition(position) {

    x.innerHTML = '<p style="margin-top: 1px;margin-bottom: 0px;padding-bottom: 0px;"><span style="font-size: 9px;">*Map KML Layers provided by <a href="http://www.weather.gov/">weather.gov</a></span><br><span style="font-size: 16px">Your current position(marker X):</span></p>' + '<p style="float: left;width: 50%;padding-bottom: 0px;margin-bottom: 0px;">Latitude: </p><p style="padding-bottom: 0px;margin-bottom: 0px;color: #337ab7;width: 50%; float: left;"><span style="font-family: sans-serif !important;margin-bottom: 0px;">' + position.coords.latitude + '</span></p>' + 

    '<p style="float: left;width: 50%;padding-bottom: 0px;margin-bottom: 0px;">Longitude: </p><p style="padding-bottom: 0px;margin-bottom: 0px;width: 50%;color: #337ab7; float: left;"><span style="font-family: sans-serif !important;margin-bottom: 0px;">' + position.coords.longitude + '</span></p>';	
	
// map variables

	var labels = 'ABCDEFGHIJKLMNOPQRSTUVWYZ';

	var labelIndex = 0;

      

// geozone paths
      var lakeCharles = [[30.751277776257812,-93.62548828125], [29.70713934813417,-93.922119140625], [29.621221113784504,-92.691650390625], [30.741835717889767,-92.74658203125], [30.751277776257812,-93.62548828125]];

	  var acadiana = [[30.744196319255348,-92.7520751953125], [30.755998458321667,-91.7523193359375], [29.46829664171322,-91.2744140625], [29.621221113784504,-92.70263671874999], [30.744196319255348,-92.7520751953125]];

	  var batonRouge = [

            [30.17362455035856,-91.53259277343749],

            [30.996445897426373,-91.834716796875],

            [31.00115451727899,-89.7308349609375],

            [30.372875188118016,-90.120849609375],

            [30.17362455035856,-91.53259277343749]

          ];

	  var houma = [

            [30.17362455035856,-91.5380859375],

			[30.278044377800153,-90.7965087890625],

            [29.084976575985888,-90.252685546875],

            [28.998531814051795,-91.0931396484375],

            [30.17362455035856,-91.5380859375]

          ];

	  var nOSlidell = [

	   		[31.005862904624205,-89.725341796875],

            [29.05136777451729,-89.0716552734375],

            [29.084976575985888,-90.252685546875],

            [30.278044377800153,-90.802001953125],

            [30.37761431777479,-90.1153564453125],

            [31.005862904624205,-89.725341796875]

          ];

	  var westKisatche = [

            [30.737114341627027,-92.757568359375],

            [32.02670629333614,-92.900390625],

            [32.00341778396365,-94.04296874999999],

            [30.755998458321667,-93.6309814453125],

            [30.737114341627027,-92.757568359375]

	  	  ];

	  var alexKisatche = [

            [32.03136328493756,-92.9058837890625],

            [32.06395559466043,-91.109619140625],

            [31.005862904624205,-91.56005859375],

            [31.005862904624205,-91.856689453125],

            [30.760718908944472, -91.7578125],

            [30.741835717889767,-92.74658203125],

            [32.03136328493756,-92.9058837890625]

	  	  ];

	  var shreveport = [

            [32.03602003973757,-92.900390625],

            [33.02708758002871,-92.83447265624999],

            [33.02708758002871,-94.06494140625],

            [31.99875937194732,-94.06494140625],

            [32.03602003973757,-92.900390625]

	  	  ];

	  var monroe = [

            [33.03629817885956,-92.845458984375],

            [32.99945000822837,-91.021728515625],

            [32.08257455954592,-90.999755859375],

            [32.045332838858506,-92.900390625],

            [33.03629817885956,-92.845458984375]

	  	  ];

// initial geozones

      var polygonLKCH = map.drawPolygon({

        paths: lakeCharles,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  var polygonACAD = map.drawPolygon({

        paths: acadiana,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  var polygonBARO = map.drawPolygon({

        paths: batonRouge,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  var polygonHOUM = map.drawPolygon({

        paths: houma,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  var polygonNOSL = map.drawPolygon({

        paths: nOSlidell,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  var polygonALKI = map.drawPolygon({

        paths: alexKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  var polygonWEKI = map.drawPolygon({

        paths: westKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  var polygonSHRV = map.drawPolygon({

        paths: shreveport,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  var polygonMONR = map.drawPolygon({

        paths: monroe,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });


// geozone-container for marker z 
       var circle = map.drawCircle({

        lat: 28.825425374,

        lng: -92.548828125,

        radius: 350,

        strokeColor: '#432070',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#432070',

        fillOpacity: 0.6

      });

	  
// marker on your current position
	  map.addMarker({

        lat: position.coords.latitude,

        lng: position.coords.longitude,

		label: 'X',

        draggable: false

	});


// draggable marker that is used to get info on other geozones
      map.addMarker({
        lat: 28.825425374, 

        lng: -92.548828125,

		label: 'Z',

        draggable: true,

        fences: [circle],

        outside: function(marker, fence){

// gets information based on geozone and displays output. Also highlights selected geozone on map
		  function getInfoB(marker){

	var ACADGFB = map.checkGeofence(marker.getPosition().lat(), marker.getPosition().lng(), polygonACAD);

	var LKCHGFB = map.checkGeofence(marker.getPosition().lat(), marker.getPosition().lng(), polygonLKCH);

	var BAROGFB = map.checkGeofence(marker.getPosition().lat(), marker.getPosition().lng(), polygonBARO);

	var HOUMGFB = map.checkGeofence(marker.getPosition().lat(), marker.getPosition().lng(), polygonHOUM);

	var NOSLGFB = map.checkGeofence(marker.getPosition().lat(), marker.getPosition().lng(), polygonNOSL);

	var ALKIGFB = map.checkGeofence(marker.getPosition().lat(), marker.getPosition().lng(), polygonALKI);

	var WEKIGFB = map.checkGeofence(marker.getPosition().lat(), marker.getPosition().lng(), polygonWEKI);

	var SHRVGFB = map.checkGeofence(marker.getPosition().lat(), marker.getPosition().lng(), polygonSHRV);

	var MONRGFB = map.checkGeofence(marker.getPosition().lat(), marker.getPosition().lng(), polygonMONR);

	var yourGeofenceB;

	if (ACADGFB === true){

		alert("The dynamic marker is in the Acadiana Geozone.");

		INFOB.innerHTML = "The dynamic marker is in the Acadiana Geozone.";

		yourGeofenceB = 'Acadiana';
		
		map.removePolygons();
		
		polygonACAD = map.drawPolygon({

        paths: acadiana,

        strokeColor: '#49AB81',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#49AB81',

        fillOpacity: 0.6

      });

	  polygonLKCH = map.drawPolygon({

        paths: lakeCharles,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonBARO = map.drawPolygon({

        paths: batonRouge,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonHOUM = map.drawPolygon({

        paths: houma,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonNOSL = map.drawPolygon({

        paths: nOSlidell,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonALKI = map.drawPolygon({

        paths: alexKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonWEKI = map.drawPolygon({

        paths: westKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonSHRV = map.drawPolygon({

        paths: shreveport,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonMONR = map.drawPolygon({

        paths: monroe,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });



	} else if (LKCHGFB === true){

		alert("The dynamic marker is in the Lake Charles Geozone.");

		INFOB.innerHTML = "The dynamic marker is in the Lake Charles Geozone.";

		yourGeofenceB = 'Lake Charles';
		
		map.removePolygons();
		
		polygonLKCH = map.drawPolygon({

        paths: lakeCharles,

        strokeColor: '#49AB81',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#49AB81',

        fillOpacity: 0.6

      });

	  polygonACAD = map.drawPolygon({

        paths: acadiana,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonBARO = map.drawPolygon({

        paths: batonRouge,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonHOUM = map.drawPolygon({

        paths: houma,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonNOSL = map.drawPolygon({

        paths: nOSlidell,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonALKI = map.drawPolygon({

        paths: alexKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonWEKI = map.drawPolygon({

        paths: westKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonSHRV = map.drawPolygon({

        paths: shreveport,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonMONR = map.drawPolygon({

        paths: monroe,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });



	} else if (BAROGFB === true){

		alert("The dynamic marker is in the Baton Rouge Geozone.");

		INFOB.innerHTML = "The dynamic marker is in the Baton Rouge Geozone.";

		yourGeofenceB = 'Baton Rouge';
		
		map.removePolygons();

		polygonLKCH = map.drawPolygon({

        paths: lakeCharles,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonACAD = map.drawPolygon({

        paths: acadiana,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonBARO = map.drawPolygon({

        paths: batonRouge,

        strokeColor: '#49AB81',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#49AB81',

        fillOpacity: 0.6

      });

	  polygonHOUM = map.drawPolygon({

        paths: houma,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonNOSL = map.drawPolygon({

        paths: nOSlidell,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonALKI = map.drawPolygon({

        paths: alexKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonWEKI = map.drawPolygon({

        paths: westKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonSHRV = map.drawPolygon({

        paths: shreveport,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonMONR = map.drawPolygon({

        paths: monroe,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });



	} else if (HOUMGFB === true){

		alert("The dynamic marker is in the Houma Geozone.");

		INFOB.innerHTML = "The dynamic marker is in the Houma Geozone.";

		yourGeofenceB = 'Houma';
		
		map.removePolygons();
		
		polygonLKCH = map.drawPolygon({

        paths: lakeCharles,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonACAD = map.drawPolygon({

        paths: acadiana,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonBARO = map.drawPolygon({

        paths: batonRouge,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonHOUM = map.drawPolygon({

        paths: houma,

        strokeColor: '#49AB81',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#49AB81',

        fillOpacity: 0.6

      });

	  polygonNOSL = map.drawPolygon({

        paths: nOSlidell,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonALKI = map.drawPolygon({

        paths: alexKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonWEKI = map.drawPolygon({

        paths: westKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonSHRV = map.drawPolygon({

        paths: shreveport,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonMONR = map.drawPolygon({

        paths: monroe,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });




	} else if (NOSLGFB === true){

		alert("The dynamic marker is in the New Orleans/Slidell Geozone.");

		INFOB.innerHTML = "The dynamic marker is in the New Orleans/Slidell Geozone.";

		yourGeofenceB = 'New Orleans/Slidell';
		
		map.removePolygons();
		
		polygonLKCH = map.drawPolygon({

        paths: lakeCharles,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonACAD = map.drawPolygon({

        paths: acadiana,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonBARO = map.drawPolygon({

        paths: batonRouge,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonHOUM = map.drawPolygon({

        paths: houma,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonNOSL = map.drawPolygon({

        paths: nOSlidell,

        strokeColor: '#49AB81',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#49AB81',

        fillOpacity: 0.6

      });

	  polygonALKI = map.drawPolygon({

        paths: alexKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonWEKI = map.drawPolygon({

        paths: westKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonSHRV = map.drawPolygon({

        paths: shreveport,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonMONR = map.drawPolygon({

        paths: monroe,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });




	} else if (ALKIGFB === true){

		alert("The dynamic marker is in the Alexandra-Kisatche Geozone.");

		INFOB.innerHTML = "The dynamic marker is in the Alexandra-Kisatche Geozone.";

		yourGeofenceB = 'Alexandra-Kisatche';
		
		map.removePolygons();
		
		polygonLKCH = map.drawPolygon({

        paths: lakeCharles,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonACAD = map.drawPolygon({

        paths: acadiana,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonBARO = map.drawPolygon({

        paths: batonRouge,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonHOUM = map.drawPolygon({

        paths: houma,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonNOSL = map.drawPolygon({

        paths: nOSlidell,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonALKI = map.drawPolygon({

        paths: alexKisatche,

        strokeColor: '#49AB81',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#49AB81',

        fillOpacity: 0.6

      });

	  polygonWEKI = map.drawPolygon({

        paths: westKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonSHRV = map.drawPolygon({

        paths: shreveport,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonMONR = map.drawPolygon({

        paths: monroe,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });




	} else if (WEKIGFB === true){

		alert("The dynamic marker is in the West-Kisatche Geozone.");

		INFOB.innerHTML = "The dynamic marker is in the West-Kisatche Geozone.";

		yourGeofenceB = 'West-Kisatche';
		
		map.removePolygons();
		
		polygonLKCH = map.drawPolygon({

        paths: lakeCharles,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonACAD = map.drawPolygon({

        paths: acadiana,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonBARO = map.drawPolygon({

        paths: batonRouge,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonHOUM = map.drawPolygon({

        paths: houma,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonNOSL = map.drawPolygon({

        paths: nOSlidell,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonALKI = map.drawPolygon({

        paths: alexKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonWEKI = map.drawPolygon({

        paths: westKisatche,

        strokeColor: '#49AB81',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#49AB81',

        fillOpacity: 0.6

      });

	  polygonSHRV = map.drawPolygon({

        paths: shreveport,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonMONR = map.drawPolygon({

        paths: monroe,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });




	} else if (SHRVGFB === true){

		alert("The dynamic marker is in the Shreveport Geozone.");

		INFOB.innerHTML = "The dynamic marker is in the Shreveport Geozone.";

		yourGeofenceB = 'Shreveport';
		
		map.removePolygons();
		
		polygonLKCH = map.drawPolygon({

        paths: lakeCharles,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonACAD = map.drawPolygon({

        paths: acadiana,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonBARO = map.drawPolygon({

        paths: batonRouge,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonHOUM = map.drawPolygon({

        paths: houma,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonNOSL = map.drawPolygon({

        paths: nOSlidell,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonALKI = map.drawPolygon({

        paths: alexKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonWEKI = map.drawPolygon({

        paths: westKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonSHRV = map.drawPolygon({

        paths: shreveport,

        strokeColor: '#49AB81',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#49AB81',

        fillOpacity: 0.6

      });

	  polygonMONR = map.drawPolygon({

        paths: monroe,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });




	} else if (MONRGFB === true){

		alert("The dynamic marker is in the Monroe Geozone.");

		INFOB.innerHTML = "The dynamic marker is in the Monroe Geozone.";

		yourGeofenceB = 'Monroe';
		
		map.removePolygons();
		
		polygonLKCH = map.drawPolygon({

        paths: lakeCharles,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonACAD = map.drawPolygon({

        paths: acadiana,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonBARO = map.drawPolygon({

        paths: batonRouge,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonHOUM = map.drawPolygon({

        paths: houma,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonNOSL = map.drawPolygon({

        paths: nOSlidell,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonALKI = map.drawPolygon({

        paths: alexKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonWEKI = map.drawPolygon({

        paths: westKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonSHRV = map.drawPolygon({

        paths: shreveport,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonMONR = map.drawPolygon({

        paths: monroe,

        strokeColor: '#49AB81',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#49AB81',

        fillOpacity: 0.6

      });


	} else {

		alert("The dynamic marker is not in Louisiana.");

		INFOB.innerHTML = "The dynamic marker is not in Louisiana.";

		yourGeofenceB = 'Not Louisiana';
		
		map.removePolygons();
		
		polygonLKCH = map.drawPolygon({

        paths: lakeCharles,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonACAD = map.drawPolygon({

        paths: acadiana,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonBARO = map.drawPolygon({

        paths: batonRouge,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonHOUM = map.drawPolygon({

        paths: houma,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonNOSL = map.drawPolygon({

        paths: nOSlidell,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonALKI = map.drawPolygon({

        paths: alexKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonWEKI = map.drawPolygon({

        paths: westKisatche,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonSHRV = map.drawPolygon({

        paths: shreveport,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	  polygonMONR = map.drawPolygon({

        paths: monroe,

        strokeColor: '#D9E2E1',

        strokeOpacity: 1,

        strokeWeight: 3,

        fillColor: '#D9E2E1',

        fillOpacity: 0.6

      });

	}

}

getInfoB(marker);

        }});

// gets information on current geozone based on location and displays output
function getInfo(position){

	var ACADGF = map.checkGeofence(position.coords.latitude, position.coords.longitude, polygonACAD);

	var LKCHGF = map.checkGeofence(position.coords.latitude, position.coords.longitude, polygonLKCH);

	var BAROGF = map.checkGeofence(position.coords.latitude, position.coords.longitude, polygonBARO);

	var HOUMGF = map.checkGeofence(position.coords.latitude, position.coords.longitude, polygonHOUM);

	var NOSLGF = map.checkGeofence(position.coords.latitude, position.coords.longitude, polygonNOSL);

	var ALKIGF = map.checkGeofence(position.coords.latitude, position.coords.longitude, polygonALKI);

	var WEKIGF = map.checkGeofence(position.coords.latitude, position.coords.longitude, polygonWEKI);

	var SHRVGF = map.checkGeofence(position.coords.latitude, position.coords.longitude, polygonSHRV);

	var MONRGF = map.checkGeofence(position.coords.latitude, position.coords.longitude, polygonMONR);

	var yourGeofence;

	if (ACADGF === true){

		alert("You are in the Acadiana Geozone.");

		INFO.innerHTML = "You are in the Acadiana Geozone.";

		yourGeofence = 'Acadiana';

	} else if (LKCHGF === true){

		alert("You are in the Lake Charles Geozone.");

		INFO.innerHTML = "You are in the Lake Charles Geozone.";

		yourGeofence = 'Lake Charles';

	} else if (BAROGF === true){

		alert("You are in the Baton Rouge Geozone.");

		INFO.innerHTML = "You are in the Baton Rouge Geozone.";

		yourGeofence = 'Baton Rouge';

	} else if (HOUMGF === true){

		alert("You are in the Houma Geozone.");

		INFO.innerHTML = "You are in the Houma Geozone.";

		yourGeofence = 'Houma';

	} else if (NOSLGF === true){

		alert("You are in the New Orleans/Slidell Geozone.");

		INFO.innerHTML = "You are in the New Orleans/Slidell Geozone.";

		yourGeofence = 'New Orleans/Slidell';

	} else if (ALKIGF === true){

		alert("You are in the Alexandra-Kisatche Geozone.");

		INFO.innerHTML = "You are in the Alexandra-Kisatche Geozone.";

		yourGeofence = 'Alexandra-Kisatche';

	} else if (WEKIGF === true){

		alert("You are in the West-Kisatche Geozone.");

		INFO.innerHTML = "You are in the West-Kisatche Geozone.";

		yourGeofence = 'West-Kisatche';

	} else if (SHRVGF === true){

		alert("You are in the Shreveport Geozone.");

		INFO.innerHTML = "You are in the Shreveport Geozone.";

		yourGeofence = 'Shreveport';

	} else if (MONRGF === true){

		alert("You are in the Monroe Geozone.");

		INFO.innerHTML = "You are in the Monroe Geozone.";

		yourGeofence = 'Monroe';

	} else {

		alert("You are not in Louisiana.");

		INFO.innerHTML = "You are not in Louisiana.";

		yourGeofence = 'Not Louisiana';

	}

}

getInfo(position);

}

getLocation();
  

function getWeatherLayer(map) {
        infoWindow = new google.maps.InfoWindow({});
	    kmlLayer = map.loadFromKML({
  url: 'http://www.lsr-go.com/lsr/wp-content/themes/Divi-child/js/NWS.kmz',
  zIndex: 6,
  preserveViewport: true
  });
  
};

function getStormMotionLayer(map) {
        infoWindow = new google.maps.InfoWindow({});
	    kmlLayer = map.loadFromKML({
  url: 'http://www.lsr-go.com/lsr/wp-content/themes/Divi-child/js/NWS_Velocity.kmz',
  zIndex: 6,
  preserveViewport: true
  });
  
};

function getNOAAWarningLayer(map) {
        infoWindow = new google.maps.InfoWindow({});
	    kmlLayer = map.loadFromKML({
  url: 'http://www.lsr-go.com/lsr/wp-content/themes/Divi-child/js/NWS_Warnings.kmz',
  zIndex: 6,
  preserveViewport: true
  });
  
}

var kmlLayer = map.loadFromKML({
  url: 'http://www.lsr-go.com/lsr/wp-content/themes/Divi-child/js/LSRuse.kmz',
  zIndex: 6,
  preserveViewport: true});
  kmlLayer.setMap(null);

map.addControl({
  position: 'right',
  content: 'Add Mosaic Layer',
  style: {
    margin: '5px',
    padding: '1px 6px',
    border: 'solid 1px #717B87',
    background: '#fff'
  },
  events: {
  click: function() {
	 kmlLayer.setMap(map.map);
    }
  }
});

map.addControl({
  position: 'right',
  content: 'Remove Mosaic Layer',
  style: {
    margin: '5px',
    padding: '1px 6px',
    border: 'solid 1px #717B87',
    background: '#fff'
  },
  events: {
  click: function() {
	 kmlLayer.setMap(null);
    }
  }
});

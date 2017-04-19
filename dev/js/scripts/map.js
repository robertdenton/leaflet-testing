var map = L.map('mapid').setView([39.747995, -104.995826], 3);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map data © <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>'
}).addTo(map);

omnivore.csv('data/airports.csv')
.on('ready', function(layer) {
  //console.log(this);
	// layer.target = this


	this.eachLayer(function(marker) {

    var mID = marker.toGeoJSON().properties.iata;
    var mTitle = marker.toGeoJSON().properties.title;
    var mCity = marker.toGeoJSON().properties.city;
    var mState = marker.toGeoJSON().properties.state;

		//console.log(marker);
		//console.log(this);
    addCard(mID,mTitle,mCity,mState);


		//L.circleMarker(marker.getLatLng(), {"radius":20}).addTo(map);
    //console.log(marker.toGeoJSON().properties.Status);
		if (mState === 'CA') {
			// The argument to L.mapbox.marker.icon is based on the
			// simplestyle-spec: see that specification for a full
			// description of options.
			//console.log("CA");
      //console.log(marker);
			//console.log(marker._latlng);
			// marker.setIcon(
			// 	L.circleMarker(marker._latlng)
			// );

			// Circle
			//L.circleMarker(marker.getLatLng(), {"radius":5}).addTo(map);
			// marker.setIcon(L.Marker.remove());

			// Leaves
			marker.setIcon(
				L.icon({
					iconUrl: 'media/approved.png',
					shadowUrl: 'media/shadow.png',

					iconSize:     [10,10], // size of the icon
					shadowSize:   [10,10], // size of the shadow
					iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
					shadowAnchor: [-2,-2],  // the same for the shadow
					popupAnchor:  [6,0] // point from which the popup should open relative to the iconAnchor
				}));
			// Trash
			//marker.setIcon(L.mapbox.marker.icon({
			//	'marker-color': '#ff8888',
			//	'marker-size': 'large'
			//}));
		} else {
			marker.setIcon(
				L.icon({
					iconUrl: 'media/pending.png',
					shadowUrl: 'media/shadow.png',

					iconSize:     [10,10], // size of the icon
					shadowSize:   [10,10], // size of the shadow
					iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
					shadowAnchor: [-2,-2],  // the same for the shadow
					popupAnchor:  [6,0] // point from which the popup should open relative to the iconAnchor
				}));
		}
		// Bind a popup to each icon based on the same properties
		marker.bindTooltip(mTitle);
    //console.log(mID);
    marker.on('click', function(){
      console.log(mID);
      var dest = "#" + mID;
      window.location = dest;
    });
    //marker.bindPopup(marker.toGeoJSON().properties.BusinessName + '<br>' + marker.toGeoJSON().properties.LocationAddress);
	});
})
.addTo(map);

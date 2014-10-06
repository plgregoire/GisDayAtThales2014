



function initializeCesium(){
	Cesium.InfoBoxViewModel.defaultSanitizer = function(rawHtml){ return rawHtml;};
	var viewer = new Cesium.Viewer('mainContainer');
		
	var dataSource = new Cesium.CzmlDataSource();
	dataSource.loadUrl('data.czml');
	viewer.dataSources.add(dataSource);
		
	viewer.extend(Cesium.viewerEntityMixin);
}


var map;

function startWE() {
	options = {atmosphere: true, zoom:3};
	map = new WE.map('mainContainer', options);
	WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
}
	
function initializeData(){
	var geoJSONDataUrl = 'http://api.tiles.mapbox.com/v3/examples.map-zr0njcqy/markers.geojson';
	$.getJSON(geoJSONDataUrl, function(data){
		for(var i=0;i<data.features.length;i++){
			var feature = data.features[i];
			var marker = WE.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]).addTo(map);
			marker.bindPopup(feature.properties.description, {maxWidth: 150, closeButton: true});
			
		}
	});
	
}

 function panTo(coords) {
	map.panTo([coords.latitude, coords.longitude]);
 }

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			panTo(position.coords); 
		});
	} 
}

	


$(function(){
	startWE();
	getLocation();
    initializeData();   
});


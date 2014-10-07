



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
      WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
          subdomains: '1234',
          attribution: 'Tiles Courtesy of MapQuest'
        }).addTo(map);
}
	
function initializeData(){
	var geoJSONDataUrl = 'http://api.tiles.mapbox.com/v3/examples.map-zr0njcqy/markers.geojson';
	$.getJSON(geoJSONDataUrl, function(data){
		addFeatureToLayer(data.features);
	});
	

}

function addFeatureToLayer(features){	
		
		for(var i=0;i<features.length;i++){
			var feature = features[i];
			var marker = WE.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], { title: feature.properties.title }).addTo(map);
			marker.bindPopup(feature.properties.description, {maxWidth: 150, closeButton: true});
			
		}
	
}

function addMarkerToPosition(position){
	var videoMarker = WE.marker([position.coords.latitude, position.coords.longitude], { title: 'video' }).addTo(map);
	$(videoMarker.element).on('click', function(){panTo(position.coords);});
}

 function panTo(coords) {
	map.panTo([coords.latitude, coords.longitude]);
 }

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			addMarkerToPosition(position);
		});
	} 
}

	


$(function(){
	startWE();
	getLocation();
    initializeData();   
});


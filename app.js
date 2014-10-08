



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
	options = {atmosphere: true, zoom:3, sky:true};
	map = new WE.map('mainContainer', options);
      WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
          subdomains: '1234',
          attribution: 'Tiles Courtesy of MapQuest'
        }).addTo(map);
	map.on('click', function(){hideContentPanel();});
	setInterval('updateInformationPanelContent()', 50);
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
		var marker = createClusterMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], { title: feature.properties.title }).addTo(map);
		marker.bindPopup(feature.properties.description, {maxWidth: 150, closeButton: true});
		
	}
	
}

function createClusterMarker(position, options){
	var marker = WE.marker(position, options);
	$(marker.element.firstChild).removeClass('we-pm-icon');
	$(marker.element.firstChild).addClass('clusterMarker');
	$(marker.element.firstChild).html(new Date().getMilliseconds() % 12);
	
	return marker;
}

function createPointerMarker(position, options){
	var marker = WE.marker(position, options);
	return marker;
}

function addMarkerToPosition(position){
	var videoMarker = createPointerMarker([position.coords.latitude, position.coords.longitude], { title: 'video' }).addTo(map);
	$(videoMarker.element).on('click', function(){
		panTo(position.coords);
		showContentPanel("<div><video id='video1' width='300'  autoplay='autoplay' loop><source src='http://vines.s3.amazonaws.com/videos/2013/05/31/A87BF731-4C60-4AEC-92E3-C483F33F30DF-6275-0000078BF555B8C3_1.1.2.mp4?versionId=FTySNqZejxrS5vuBW_UhGnwCPIch8.ZM'  type='video/mp4' /></video></div>");
	});
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

function showContentPanel(content){

	$('#contentPanel').html(content);
	$('#contentPanel').show();
}

function hideContentPanel(content){

	$('#contentPanel').hide();
	$('#contentPanel').html('');
	updateInformationPanelContent();
	
}

function updateInformationPanelContent(){
	$('#informationPanel').html("altitude:" + map.getAltitude() + ", position:" + map.getPosition() +", zoom:" + map.getZoom());
}

	


$(function(){
	startWE();
	getLocation();
    initializeData();   
});


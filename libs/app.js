


var map;
var animate = true;
function startWE() {
	options = {atmosphere: true, zoom:3, sky:true};
	map = new WE.map('mainContainer', options);
      WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
          subdomains: '1234',
          attribution: 'Tiles Courtesy of MapQuest'
        }).addTo(map);
	//$('#mainContainer').on('click', function(){animate = false; hideContentPanel();});	
	$('#mainContainer').on('vclick', function(){animate = false; hideContentPanel(); });
	setInterval('updateInformationPanelContent()', 50);
	// Start a simple rotation animation
    setInterval(function() {
		if(animate){
          var c = map.getPosition();
          map.setCenter([c[0], c[1] + 0.1]);
		}
        }, 90);
}
	
function initializeData(){
	var geoJSONDataUrl = 'sma.json';
	$.getJSON(geoJSONDataUrl, function(data){
		var featuresByLocation = getFeaturesByLocation(data.documents);
		addFeaturesToLayer(featuresByLocation);
	});
	

}

function  getFeaturesByLocation(features){

	var featuresByLocation = {};
	for(var i=0;i<features.length;i++){
		var feature = features[i];
		if(feature.location){
			if(!featuresByLocation[feature.location]){
				featuresByLocation[feature.location] = [];
			}
			featuresByLocation[feature.location].push(feature);
		} 
	}
	
	return featuresByLocation;

}

function addFeaturesToLayer(featuresByLocation){	
		
	for(var location in featuresByLocation){
		var features = featuresByLocation[location];
		var coordinates = location.split(',');
		
		if(features.length > 1){
			createClusterMarker(coordinates, { }, features.length).addTo(map);
		}else{
			createPointerMarker(coordinates, { }).addTo(map);
		}
	}
	
}


function createClusterMarker(position, options, content){
	var marker = WE.marker(position, options);
	$(marker.element.firstChild).removeClass('we-pm-icon');
	$(marker.element.firstChild).addClass('clusterMarker');
	$(marker.element.firstChild).html(content);
	
	return marker;
}

function createPointerMarker(position, options){
	var marker = WE.marker(position, options);
	return marker;
}

function addMarkerToPosition(position){
	var videoMarker = createPointerMarker([position.coords.latitude, position.coords.longitude], { title: 'video' }).addTo(map);
	$(videoMarker.element).on('vclick', function(event){
		panTo(position.coords);
		event.stopPropagation();
		showContentPanel('<div id="post" class="video-js vjs-default-skin vjs-playing " style="width: 200px; height: 200px;">' +
		'<video id="vineVideo" class="vjs-tech " loop="" autoplay="autoplay" preload="auto" poster="https://v.cdn.vine.co/r/thumbs/0C7A8C71A61127111675787513856_2.5.1.12204246823284265530.mp4.jpg"' +
		' src="https://mtc.cdn.vine.co/r/videos/46433DED801127111674810327040_29787492a48.5.1.12204246823284265530.mp4">' +
		'<source src="https://mtc.cdn.vine.co/r/videos/46433DED801127111674810327040_29787492a48.5.1.12204246823284265530.mp4" type="video/mp4">' +
		'</video><div></div><div class="vjs-poster" tabindex="-1" style="display: none; background-image: url(https://v.cdn.vine.co/r/thumbs/0C7A8C71A61127111675787513856_2.5.1.12204246823284265530.mp4.jpg);">' +
		'</div><div class="vjs-text-track-display"></div><div class="vjs-big-play-button" aria-live="polite" tabindex="0" aria-label="play video" style="display: none;"><span></span></div></div>');
		var video = document.getElementById('vineVideo');
		video.play();
		
	});
}

 function panTo(coords) {
	map.panTo([coords.latitude, coords.longitude]);
 }

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			panTo(position);
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

	
}


function updateInformationPanelContent(){

	//$('#informationPanel').html("altitude:" + map.getAltitude() + ", position:" + map.getPosition() +", zoom:" + map.getZoom());
	//$('#informationPanel').html("bounds: " + map.getBounds());
}

	


$(function(){
	startWE();
	getLocation();
    initializeData();   
});

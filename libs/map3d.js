

function Map3D() {
	this.map  = null;
	this.animate = true;
	var self = this;

	Map3D.prototype.startWE = function() {
		options = {atmosphere: true, zoom:3, sky:true};
		this.map = new WE.map('mainContainer', options);
		  WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
			  subdomains: '1234',
			  attribution: 'Tiles Courtesy of MapQuest'
			}).addTo(this.map);
	
		$('#mainContainer').on('vclick', function(){self.animate = false; self.hideContentPanel(); });
		// Start a simple rotation animation
		setInterval(function() {
			if(this.animate){
			  var c = map.getPosition();
			  map.setCenter([c[0], c[1] + 0.1]);
			}
			}, 90);
			
		this.getLocation();
		this.initializeData(); 
	}
		
	Map3D.prototype.initializeData  = function(){
		var geoJSONDataUrl = 'sma.json';

		$.getJSON(geoJSONDataUrl, function(data){
			var featuresByLocation = self.getFeaturesByLocation(data.documents);
			self.addFeaturesToLayer(featuresByLocation);
		});
		

	}

	Map3D.prototype.getFeaturesByLocation = function(features){

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

	Map3D.prototype.addFeaturesToLayer= function(featuresByLocation){	
			
		for(var location in featuresByLocation){
			var features = featuresByLocation[location];
			var coordinates = location.split(',');
			
			if(features.length > 1){
				this.createClusterMarker(coordinates, { }, features).addTo(this.map);
			}else if(features.length > 0){
				this.createPointerMarker(coordinates, { }, features[0]).addTo(this.map);
			}
		}
		
	}
	Map3D.prototype.createPointerMarker= function(position, options, feature){
		var marker = WE.marker(position, options);
		var sentimentValue = this.getFeatureSentimentValue(feature);
		$(marker.element.firstChild).addClass(this.getFeatureMarkerColorClassFromSentimentValue(sentimentValue));
			
		return marker;
	}

	Map3D.prototype.createClusterMarker= function(position, options, features){
		var marker = WE.marker(position, options);
		$(marker.element.firstChild).removeClass('we-pm-icon');
		$(marker.element.firstChild).addClass('marker-cluster');
		
		var sentimentValue = this.getFeaturesSentimentValue(features);
		
		$(marker.element.firstChild).addClass(this.getClusterMarkerColorClassFromSentimentValue(sentimentValue));
		$(marker.element.firstChild).html('<div>' + features.length + '</div>');
		
		return marker;
	}

	Map3D.prototype.getFeaturesSentimentValue= function(features){
		var result = 0;
		for(var i=0;i<features.length;i++){
			result += this.getFeatureSentimentValue(features[i]);
		}
		return result;
	}

	Map3D.prototype.getFeatureSentimentValue= function(feature){
		return (feature.sentiment.negative * -1) + feature.sentiment.positive;
	}

	Map3D.prototype.getClusterMarkerColorClassFromSentimentValue= function(sentimentValue){
		var result = 'marker-cluster-grey';
		if (sentimentValue > 0){
			result = 'marker-cluster-green';
		}else if(sentimentValue < 0){
			result = 'marker-cluster-red';
		}
		
		return result;
	}

	Map3D.prototype.getFeatureMarkerColorClassFromSentimentValue = function(sentimentValue){
		var result = 'marker-feature-grey';
		if (sentimentValue > 0){
			result = 'marker-feature-green';
		}else if(sentimentValue < 0){
			result = 'marker-feature-red';
		}
		
		return result;
	}



	Map3D.prototype.addMarkerToPosition= function(position){
		var videoMarker = this.createPointerMarker([position.coords.latitude, position.coords.longitude], { title: 'video' }).addTo(map);
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

	 Map3D.prototype.panTo = function(coords) {
		//map.panTo([coords.latitude, coords.longitude]);
	 }

	Map3D.prototype.getLocation= function() {
		
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
				self.panTo(position);
			});
		} 
	}

	Map3D.prototype.showContentPanel= function(content){

		$('#contentPanel').html(content);
		$('#contentPanel').show();
	}

	Map3D.prototype.hideContentPanel= function(content){

		$('#contentPanel').hide();
		$('#contentPanel').html('');

		
	}


}


$(function(){
	var map3D = new Map3D();
	map3D.startWE();  
});


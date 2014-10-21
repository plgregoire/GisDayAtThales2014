function VectorMarker(options){
	
	this.options = $.extend({
		markerColor: "blue"
	  }, options);
	
};

VectorMarker.prototype = {

	MAP_PIN : 'M16,1 C7.7146,1 1,7.65636364 1,15.8648485 C1,24.0760606 16,51 16,51 C16,51 31,24.0760606 31,15.8648485 C31,7.65636364 24.2815,1 16,1 L16,1 Z',
	
	createIcon : function() {
		var div = document.createElement("div");
		var options = this.options;
		var pin_path = this.MAP_PIN;
		div.innerHTML = '<svg width="25px" height="41px" viewBox="0 0 32 52" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + '<path d="' + pin_path + '" fill="' + options.markerColor + '"></path><i></i></svg>';
		div.className = 'vector-marker';
		return div;
	}
};

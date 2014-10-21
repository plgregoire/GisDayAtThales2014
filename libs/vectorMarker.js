function VectorMarker(options){
	
	this.options = $.extend({
		iconSize: [30, 50],
		iconAnchor: [15, 50],
		popupAnchor: [2, -40],
		shadowAnchor: [7, 45],
		shadowSize: [54, 51],
		className: "vector-marker",
		prefix: "fa",
		spinClass: "fa-spin",
		extraClasses: "",
		icon: "home",
		markerColor: "blue",
		iconColor: "white"
	  }, options);
	
};

VectorMarker.prototype = {

	MAP_PIN : 'M16,1 C7.7146,1 1,7.65636364 1,15.8648485 C1,24.0760606 16,51 16,51 C16,51 31,24.0760606 31,15.8648485 C31,7.65636364 24.2815,1 16,1 L16,1 Z',
	
	createIcon : function(oldIcon) {
		var div, icon, options, pin_path;
		div = (oldIcon && oldIcon.tagName === "DIV" ? oldIcon : document.createElement("div"));
		options = this.options;
		if (options.icon) {
		  icon = this._createInner();
		}
		pin_path = this.MAP_PIN;
		div.innerHTML = '<svg width="25px" height="41px" viewBox="0 0 32 52" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + '<path d="' + pin_path + '" fill="' + options.markerColor + '"></path>' + icon + '</svg>';
		this._setIconStyles(div, "icon");
		return div;
	},


	createShadow : function() {
		var div;
		div = document.createElement("div");
		this._setIconStyles(div, "shadow");
		return div;
	},
	
	_createInner: function() {
		var iconClass, iconColorClass, iconColorStyle, iconSpinClass, options;
		iconClass = void 0;
		iconSpinClass = "";
		iconColorClass = "";
		iconColorStyle = "";
		options = this.options;
		if (options.prefix === '' || options.icon.slice(0, options.prefix.length + 1) === options.prefix + "-") {
		  iconClass = options.icon;
		} else {
		  iconClass = options.prefix + "-" + options.icon;
		}
		if (options.spin && typeof options.spinClass === "string") {
		  iconSpinClass = options.spinClass;
		}
		if (options.iconColor) {
		  if (options.iconColor === "white" || options.iconColor === "black") {
			iconColorClass = "icon-" + options.iconColor;
		  } else {
			iconColorStyle = "style='color: " + options.iconColor + "' ";
		  }
		}
		return "<i " + iconColorStyle + "class='" + options.extraClasses + " " + options.prefix + " " + iconClass + " " + iconSpinClass + " " + iconColorClass + "'></i>";
	},
	_setIconStyles: function(img, name) {
		options = this.options;
		img.className = "vector-marker-" + name + " " + options.className;

	}
};

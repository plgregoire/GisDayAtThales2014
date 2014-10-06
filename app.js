



function initializeCesium(){
	Cesium.InfoBoxViewModel.defaultSanitizer = function(rawHtml){ return rawHtml;};
	var viewer = new Cesium.Viewer('mainContainer');
		
	var dataSource = new Cesium.CzmlDataSource();
	dataSource.loadUrl('data.czml');
	viewer.dataSources.add(dataSource);
		
	viewer.extend(Cesium.viewerEntityMixin);
}


var app;

    function startWE() {
      app = new WebGLEarth('mainContainer', {
        atmosphere: true,
        position: [47.2, 8.5],
        altitude: 7000000,
        panning: true,
        tilting: true,
        zooming: true,
        proxyHost: 'http://srtm.webglearth.com/cgi-bin/corsproxy.fcgi?url='
      });

    }

$(function(){
	startWE();
});


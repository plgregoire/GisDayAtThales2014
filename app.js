Cesium.InfoBoxViewModel.defaultSanitizer = function(rawHtml){ return rawHtml;};
var viewer = new Cesium.Viewer('cesiumContainer');
	
var dataSource = new Cesium.CzmlDataSource();
dataSource.loadUrl('data.czml');
viewer.dataSources.add(dataSource);
	
viewer.extend(Cesium.viewerEntityMixin);



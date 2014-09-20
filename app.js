
	var viewer = new Cesium.Viewer('cesiumContainer');
	
	    var dataSource = new Cesium.GeoJsonDataSource();
		viewer.dataSources.add(dataSource);
		dataSource.loadUrl('data.geojson');
	
	viewer.extend(Cesium.viewerEntityMixin);

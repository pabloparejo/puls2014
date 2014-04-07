var base_url = "http://query.yahooapis.com/v1/public/yql?"

function obtenerGeoInfo(lat, lon){

	var query = "SELECT * FROM geo.placefinder WHERE text='"+lat+", "+lon+"'";
	query += " AND gflags='R'";

	query = encodeURIComponent(query);

	var opts = {
		url: base_url + 'q=' + query,
		dataType : 'jsonp',
		jsonpCallback: 'geoCallBack',
		data:{
			format:'json'
		}
	}

	$.ajax(opts)
}

function getWeather(woeid){
	var query = "SELECT * FROM weather.forecast WHERE woeid='"+woeid+"'";
	query += " AND u='c'";
	query = encodeURIComponent(query);

	var opts = {
		url: base_url + 'q=' + query,
		dataType : 'jsonp',
		jsonpCallback: 'weatherCallBack',
		data:{
			format:'json'
		}
	}

	$.ajax(opts)
}

function weatherCallBack(data){
	console.log(data);
}

function geoCallBack(data){
	var info 	= data.query.results.Result;
	var pais 	= info.country;
	var ciudad	= info.city;
	var barrio	= info.neighborhood;
	var woeid 	= info.woeid;

	getWeather(woeid);

	var tmp 	= '<p>'+pais+'<strong>'+ barrio +'</strong>'+ciudad+'</p>'
	$('#geo').prepend(tmp);
}

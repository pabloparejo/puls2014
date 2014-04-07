
var $formulario     = $('#formulario'),
    $titulo         = $('#titulo'),
    $link           = $('#link'),
    $contenido      = $('#contenido'),
    $primerPost     = $('.item').first(),
    $ss             = sessionStorage,
    $ls             = localStorage;

if ($ss.getItem('titulo')){
    $titulo.val($ss.getItem('titulo'));
    $link.val($ss.getItem('link'));
}

function save(){
    $ss['titulo']   = $titulo.val();
    $ss['link']     = $link.val();
}

$('#formulario input').on('input', save);



function showHideForm(){
    $('#formulario').slideToggle();
    $contenido.slideToggle();
}

function addPost(e){
    e.preventDefault();
    var titulo = $titulo.val(),
        link = $link.val();
        clone = $primerPost.clone();
    clone.find('.titulo_item a')
        .text(titulo)
        .attr('href', link);

    clone.hide();
    
    $contenido.prepend(clone);

    showHideForm();
    $titulo.val('');
    $link.val('');

    clone.fadeIn();

}

$('#publicar_nav a').click(showHideForm)
$formulario.on('submit', addPost)

options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function geo_exito(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var mapa = new Image();

    mapa.src = "http://maps.googleapis.com/maps/api/staticmap?center="+lat+","+lon+"&zoom=13&size=200x200&sensor=false&maptype=hybrid"
    $("#geo").hide();
    $("#geo").append(mapa);

    $("#geo").slideDown();

    obtenerGeoInfo(lat, lon);
}

function geo_error(){
    console.log("No sé ande andas soooosio!")
}

var geo = navigator.geolocation;
geo.getCurrentPosition(geo_exito, geo_error, options);


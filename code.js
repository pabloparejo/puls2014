
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
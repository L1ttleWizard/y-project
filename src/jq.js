import $ from 'jquery';
$('.nav-link').on('click', function(){
    $('#offcanvasResponsive').removeClass('show');
    $('.backdrop').fadeOut();
});

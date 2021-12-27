$(document).ready(function() {
    $('.goTo').click(function(e) {
        e.preventDefault();

        const block = $(this).attr('href');
        $('body, html').animate({ scrollTop: $(block).offset().top + 'px'});
    });

    $('.menu-item').click(function(e) {
        e.stopPropagation();

        const block = $(this);
        $('.menu-item__content--active').removeClass('menu-item__content--active');
        setTimeout(function() {
            block.find('.menu-item__content').addClass('menu-item__content--active');
            $('.menu-item__content--active').find('video').get(0).play();
        }, 100);
    });
    $('body').click(function(e) {
        $('.menu-item__content--active').removeClass('menu-item__content--active');
    });
});
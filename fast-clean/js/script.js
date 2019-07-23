(function ($) {

// Закрепляем сайдбар при прокрутке

$("#sidebar-sticky").sticky({topSpacing:20});

// Слайдер примеры работ
    $('.examples-slider').each(function(index, el) {
        var slider = $(this);
        var sliderBlock = slider.find('.slider-block');

        sliderBlock.slick({
            infinite: false,
            fade: true,
            speed: 200,
            slidesToShow: 1,
            slidesToScroll: 1,
            // autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
            arrows: false,
            appendDots: slider.find('.slider-dots')
        });
    });

// Обрезаем текст
    function truncateText() {
        $('.truncate-text').each(function(index, el) {
            var content = $(this),
                row = content.attr('truncate-row');

            content.trunk8({
              lines: row,
              fill: '&hellip;'
            });
        });
    };

    $(window).on('load resize', truncateText);

// колонки с одинаковой высотой
    function matchHeight() {
        var rows = $.fn.matchHeight._rows($('.equalHeight'));

        $.each(rows, function(i, row) {
            row.first().addClass('first');
            row.last().addClass('last');
        });
    };

    $(window).on('load scroll',matchHeight);


// Анимация плитки
    $('.display-animation').each(function(index, el) {
        var speed = 4000;
        var container =  $(this);
        container.each(function() {
            var elements = $(this).find('.display-animation-item');
            elements.each(function() {
                var elementOffset = $(this).offset();
                var offset = elementOffset.left*0.8 + elementOffset.top;
                var delay = parseFloat(offset/speed).toFixed(2);
                $(this)
                    .css("-webkit-animation-delay", delay+'s')
                    .css("-o-animation-delay", delay+'s')
                    .css("animation-delay", delay+'s')
                    .addClass('animated');
            });
        });
    });

//маска для поля телефон 
    $(".phoneInput").mask("+7(999) 999-9999");

// Валидация
    $('.validate-form').validate({
        rules:{
            tel:{
                required: true,
                minlength: 10,
            },
            email: {
                minlength: 8,
                email: true
            },
        },
        messages:{
            tel:{
                required: "Это поле обязательно для заполнения",
                minlength: "Номер должен быть не короче 10 символов",
            },
            email: {
                minlength: "E-mail должен быть не короче 8 символов",
                email: "Введен некорректный E-mail",
            },
        }
    });

// Мобильное меню
    $('.mbl-left-menu__open').click(function(event) {
        var thisMenu = $(this).closest('.mbl-left-menu__parent');
        var thisSub = thisMenu.find('.mbl-left-menu__sub');

        if (thisSub.is(':visible')) {
            thisSub.slideUp('fast');
            thisMenu.removeClass('open');
        } else {
            $('.mbl-left-menu__parent').removeClass('open');
            $('.mbl-left-menu__sub').slideUp('fast');
            thisSub.slideDown('fast');
            thisMenu.addClass('open');
        }
    });

})(jQuery);
//end script

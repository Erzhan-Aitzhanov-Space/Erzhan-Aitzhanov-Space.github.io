(function ($) {
// колонки с одинаковой высотой
    function matchHeight() {
        var rows = $.fn.matchHeight._rows($('.equalHeight'));

        $.each(rows, function(i, row) {
            row.first().addClass('first');
            row.last().addClass('last');
        });
    };

    $(window).on('load scroll',matchHeight);

// sticky menu
    $(function () {
        var menu = $('.main-menu'),
            header = $('.header'),
            headerHeight = $('.header').innerHeight();

        $(window).on('load scroll', function(event) {
            var menuHeight = $('.main-menu').innerHeight();

            if($(this).scrollTop() > headerHeight - menuHeight) {
                header.addClass('scrolled');
                header.css('marginBottom', menuHeight);
            } else {
                header.removeClass('scrolled');
                header.css('marginBottom', '');
            }
        });
    });

// Главный слайдер
    function mainSlider() {

        var slider = $('.main-slider'),
            sliderBlock = slider.find('.slider-block'),
            slideItem = slider.find('.slide-item'),
            headerHeight = $('.header').innerHeight(),
            time = 5,
            dots = slider.find('.main-slider__dots');

        slideItem.find('.vh100').css('paddingTop', headerHeight);
        sliderBlock.slick({
            infinite: false,
            fade: true,
            pauseOnHover: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: time * 1000,
            arrows: false,
            dots: true,
            appendDots: dots
        });
    };
    mainSlider();

// Carousel
    $('.carousel').each(function(index, el) {
        var slider = $(this),
            sliderBlock = slider.find('.slider-block');

        sliderBlock.slick({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            // autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
            appendDots: slider.find('.slider-dots'),
            prevArrow: slider.find('.slider__prev'),
            nextArrow: slider.find('.slider__next'),
            responsive: [
                {
                  breakpoint: 1220,
                  settings: {
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 540,
                  settings: {
                    slidesToShow: 1
                  }
                }
            ]
        });
    });

// Review slider
    $('.review-slider').each(function(index, el) {
        var slider = $(this),
            sliderBlock = slider.find('.slider-block');

        sliderBlock.slick({
            infinite: false,
            // centerMode: true,
            swipeToSlide: true,
            slidesToShow: 2,
            variableWidth: true,
            dots: false,
            prevArrow: slider.find('.slider__prev'),
            nextArrow: slider.find('.slider__next')
        });
    });

// Слайдер на детальной
    $('.detail-slider').each(function(index, el) {
        var slider = $(this),
            sliderBlock = slider.children('.slider-block'),
            sliderThumb = slider.find('.slider-vertical'),
            sliderThumbBlock = sliderThumb.children('.slider-block');

        sliderBlock.slick({
            infinite: false,
            speed: 300,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            // autoplay: true,
            autoplaySpeed: 5000,
            dots: false,
            arrows: true,
            asNavFor: sliderThumbBlock,
            prevArrow: slider.children('.slider__prev'),
            nextArrow: slider.children('.slider__next')
        });

        sliderThumbBlock.slick({
            asNavFor: sliderBlock,
            infinite: false,
            vertical: true,
            verticalSwiping: true,
            focusOnSelect: true,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            // autoplay: true,
            autoplaySpeed: 5000,
            dots: false,
            arrows: true,
            prevArrow: sliderThumb.find('.slider__prev'),
            nextArrow: sliderThumb.find('.slider__next'),
            responsive: [
                {
                  breakpoint: 1220,
                  settings: {
                    vertical: false,
                    verticalSwiping: false
                  }
                },
                {
                  breakpoint: 960,
                  settings: {
                    slidesToShow: 4,
                    vertical: false,
                    verticalSwiping: false
                  }
                }
            ]
        });
    });

// Для работы object-fit во всех браузерах
    $(function () {
        objectFitImages ();
    });

// Стилизация select
    $('select').dropdown();

// Стилизация скрола
    $('.scrollbar-inner').scrollbar({
        horizontal: true
    });

// Бегунок цены
    $('.double-range').each(function(index, el) {

        var $range = $(this).find(".runner-item"),
        $from = $(this).find(".min-item"),
        $to = $(this).find(".max-item"),
        min = $from.attr('min-val'),
        max = $to.attr('max-val');

        $range.ionRangeSlider({
            keyboard: true,
            min: min,
            max: max,
            hide_min_max: true,
            hide_from_to: true,
            from: $from.attr('value'),
            to: $to.attr('value'),
            type: 'double',
            step: 100,
            onStart: function (data) {
                $from.attr("value", data.from);
                $to.attr("value", data.to);
            },
            onChange: function (data) {
                $from.attr("value", data.from);
                $to.attr("value", data.to);
            }
        });
    });

// Счетчик в корзине
    // .live сменил на .on для демонстрации работы
    $('.number-spinner > span').on('click', function () {
        var couterDetailValue = +$(this).parent('.number-spinner').find('input').val();
        var currentValueInput = $(this).parent('.number-spinner').find('input');
        if ($(this).find('span').attr('data-dir') === 'dwn') {
            if (couterDetailValue === 0)return false;
            couterDetailValue = couterDetailValue - 1;
            currentValueInput.val(couterDetailValue);
        }
        if ($(this).find('span').attr('data-dir') === 'up') {
            couterDetailValue = couterDetailValue + 1;
            currentValueInput.val(couterDetailValue);
        }
    })
    // $('.ms2_form .number-spinner > span').live('click', function () {
    //     $(this).parent('div').parent('.ms2_form').submit();
    // });


// График работы
    $('.schedule-list__item').each(function(index, el) {
        // Get hours
        var date = new Date(),
            hours = date.getHours();

        var elem = $(this),
            elemTime = elem.attr('time');

        if (elemTime == hours ) {
            elem.addClass('active')
        }
    });

// Добавить/убрать из избранного, скрипт только для работы примера!
    $('.favorite-btn').click(function(event) {
        var btn = $(this),
            btnAttr = btn.attr('data-added');

        if (btn.hasClass('add-fav') ) {
            btn.attr({
                'data-added': 'added',
                'alt': 'Убрать из избранного',
                'title': 'Убрать из избранного'
            });
            btn.removeClass('add-fav');
            btn.addClass('remove-fav');
        } else {
            btn.attr({
                'data-added': '',
                'alt': 'Добавить в избранное',
                'title': 'Добавить в избранное'
            });
            btn.removeClass('remove-fav');
            btn.addClass('add-fav');
        }
    });

// Открыть/закрыть фильтр
    $('.filter__open-btn').click(function(event) {
        var btn = $(this),
            filter = btn.closest('.filter'),
            filterBody = filter.find('.filter__body'),
            closeBtn = filter.find('.filter__close-btn');

        if (filterBody.is(':visible')) {
            filter.removeClass('open');
            closeBtn.hide();
            filterBody.slideUp();
        } else {
            filter.addClass('open');
            closeBtn.show();
            filterBody.slideDown();
        }
    });

// Мобильное меню каталога
    $('#mblCatalogMenu').slinky({
        title: true
    });

    $('.mbl-catalog-title').click(function(event) {
        var catalog = $(this).closest('.mbl-catalog'),
            menu = catalog.find('.mbl-catalog__list');

        if (menu.is(':visible')) {
            menu.slideUp('fast');
            catalog.removeClass('open');
        } else {
            menu.slideDown('fast');
            catalog.addClass('open');
        }
    });

    $('#mblMenu').on('hide.uk.offcanvas', function () {
        $('.mbl-catalog__list').slideUp('fast');
        $('.mbl-catalog').removeClass('open');
    });

    $('.open-mbl-catalog').click(function(event) {
        $('.mbl-catalog__list').slideDown('fast');
        $('.mbl-catalog').addClass('open');
    });


// Скролл элемента
    function moveableElem() {
        var moveableArea = $('.moveable').closest('.order-form').height();
        var moveableHeight = $('.moveable').height();
        
        if ($(window).innerWidth() > 960) {
            $(window).scroll(function() {
                var $moveable = $('.moveable');

                    if (!$moveable.length)
                        return;
                    
                    function getPageScroll() {
                        var yScroll;
                        if (self.pageYOffset) {
                            yScroll = self.pageYOffset;
                        } else if (document.documentElement && document.documentElement.scrollTop) {
                            yScroll = document.documentElement.scrollTop;
                        } else if (document.body) {
                            yScroll = document.body.scrollTop;
                        }
                        return yScroll;
                    }
                        
                    var offset = getPageScroll() - $moveable.offset().top + 80;
                    if ($moveable.parent().height() != $moveable.parent().parent().height())
                        offset = 0;
                    if (offset < 0)
                        offset = 0;
                    if (moveableHeight + offset > moveableArea) {
                        offset = moveableArea - moveableHeight;
                    }
                    $moveable.css('padding-top',offset);
            });
        } else {
            $('.moveable').css('padding-top', '');
            return false;
        }
    };
    $(window).on('load resize', moveableElem);

//маска для поля телефон 
    $(".phoneInput").mask("+7(999) 999-9999");

// Для моб устройств
    $(function () {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Высота на весь экран
            function fullHeight () {
                var windowHeight = $(window).height();
                $('.vh100').css('height', windowHeight);
            };

            $(window).on('load resize',fullHeight); 
        };
    });

})(jQuery);
//end script

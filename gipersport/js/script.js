(function ($) {

// колонки с одинаковой высотой
    function matchHeight() {
        var rows = $.fn.matchHeight._rows($('.equalHeight'));

        $.each(rows, function(i, row) {
            row.first().addClass('first');
            row.last().addClass('last');
        });
    };

    $(window).on('load',matchHeight);

// Подсветка текста в результатах поиска
    $('.search-navbar').find('.search-navbar__input').keyup(function(event) {
        var result = $(this).closest('.search-navbar').find('.product__title'),
            value = $(this).val();
        
        result.removeHighlight();
        result.highlight(value);
    });

// Перемещение линии в главном меню
    function menuMarker() {
        $('.main-nav').each(function(index, el) {
            var menu = $(this);
            var thisMarker = menu.find('.main-nav__marker');
            var thisElem = menu.find('.uk-navbar-nav>li')

            var activeElem = menu.find('.uk-navbar-nav>li.uk-active');
            var activeElemWidth = activeElem.width();
            var activeElemPos = activeElem.position();

            // Выставляем линию активному пункту
            function activeElement() {
                thisMarker.css({
                    left: activeElemPos.left,
                    width: activeElemWidth
                });
            }
            activeElement();

            thisElem.hover(function() {
                // Узнаем позицию от левого края
                var thisPosition = $(this).position();
                // Узнаем ширину пункта меню
                var thisWidth = $(this).width();

                // Выставляем значения
                thisMarker.css({
                    left: thisPosition.left,
                    width: thisWidth
                });
            }, function() {
                // Возвращаем линию на активный пункт 
                activeElement();
            });
        });
    };

    $(window).on('load resize',menuMarker);

//  Второй уровень выпадающего меню
    function secondLevel() {
        $('.second-level').hover(function() {
            var menu = $(this).closest('.uk-dropdown');
                menuPos = menu.position(),
                menuWidth = menu.innerWidth(),
                dropdown = $(this).find('.second-level__dropdown');
            
            // Выставляем значения
            dropdown.css({
                left: menuPos.left + menuWidth
            });
            $(this).addClass('open')
        }, function() {
            $(this).removeClass('open')
        });
    };

    $(window).on('load resize',secondLevel);

// счетчик количества продуктов
    $('.quantity button').click(function() {
        var $input = $(this).closest('.quantity').find('input');

        if ( $(this).hasClass('minus') ) {
            var count = parseInt($input.val()) - 1;    
            count = count < 1 ? 1 : count;
            $input.val(count);
            $input.change();
            return false;
        } else if ( $(this).hasClass('plus')) {
            var countPlus = parseInt($input.val()) + 1;    
            $input.val(countPlus);
            $input.change();
            return false;
        }
    });  

// ---------------------------------------------------------
// Бегунок цены
// ---------------------------------------------------------

    // Двойной
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

    // Одиночный
    $('.single-range').each(function(index, el) {

        var $range = $(this).find(".runner-item"),
        $from = $(this).find(".max-item"),
        $to = $(this).find(".min-item"),
        max = $from.attr('max-val');

        $range.ionRangeSlider({
            keyboard: true,
            min: 0,
            max: max,
            hide_min_max: true,
            hide_from_to: true,
            from: $from.attr('value'),
            to: 0,
            type: 'single',
            step: 1,
            onStart: function (data) {
                $to.attr("value", data.to);
                $from.attr("value", data.from);
            },
            onChange: function (data) {
                $from.attr("value", data.from);
            }
        });
    });
    
// Кастомный скролл
    $('.scrollbar-inner').scrollbar({
        horizontal: true
    });

// Стилизация select
    $('select').dropdown();

// Меню каталога в сайдбаре
    $('.catalog-menu__parent-open').click(function(event) {
        var thisMenu = $(this).closest('.catalog-menu__parent');
        var thisSub = thisMenu.find('.catalog-menu__sub');

        if (thisSub.is(':visible')) {
            thisMenu.removeClass('open');
            thisSub.slideUp();
        } else {
            $('.catalog-menu__parent').removeClass('open');
            $('.catalog-menu__sub').slideUp();
            thisMenu.addClass('open');
            thisSub.slideDown();
        }
    });    

//маска для поля телефон 
    $(".phoneInput").mask("+7(999) 999-9999");

// Мобильное меню в шапке 
    $('.open-menu').click(function(event) {
        var menu = $(this).closest('.main-nav'),
            menuNav = menu.find('.mbl-menu');

        // Анимация на кнопке
        if ($(this).hasClass('open')) {
            $(this).removeClass('open')
        } else {
            $(this).addClass('open')
        }

        // показываем меню по клику
        if (menuNav.hasClass('open')) {
            menuNav.removeClass('open')
        } else {
            menuNav.addClass('open')
        }
    });
// Второй уровень в мобильном меню
    $('.mbl-menu__nav-parrent>a').click(function(event) {
        var parrent = $(this).closest('.mbl-menu__nav-parrent'),
            subNav = parrent.find('.mbl-menu__nav-dropdown');

        if (subNav.is(':visible')) {
            subNav.slideUp();
            parrent.removeClass('open');
        } else {
            subNav.slideDown();
            parrent.addClass('open')
        }
    });

// Филтр на мобильных
    $('.filter__open').click(function(event) {
        var filter = $(this).closest('.filter'),
            filterCollapse = filter.find('.filter__collapse');

        if (window.innerWidth < 960) {
            filter.toggleClass('.open');
            filterCollapse.slideToggle();
        }
    });
    function filterCollapse() {
        if (window.innerWidth > 960) {
            $('.filter__collapse').show();
        }
    };

    $(window).on('load resize', filterCollapse);

// Убираем префиксы в полях при фокусе
    $('.clear-prefix>input').focus(function(event) {
        var inputBlock = $(this).parent();

        inputBlock.addClass('hide');
    });
    $('.clear-prefix>input').blur(function(event) {
        var inputBlock = $(this).parent();

        inputBlock.removeClass('hide');
    });

//end script
})(jQuery);


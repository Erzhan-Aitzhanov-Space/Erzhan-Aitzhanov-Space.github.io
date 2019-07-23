(function ($) {

// masonry
  $(function () {
    var $grid = $('.masonry-grid').isotope({
      itemSelector: '.masonry-column',
      percentPosition: true,
      stagger: 30,
      transitionDuration: '0.4s',
      masonry: {
        columnWidth: '.grid-sizer',
      }
    });

    // filter items on button click
    $('.js__masonry-filter').on( 'click', '.js__masonry-toggle', function() {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });
      $('[class*=uk-animation-]').css('animationName', 'auto');
    });

    // change active class on buttons
    $('.js__masonry-filter').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', '.js__masonry-toggle', function() {
        $buttonGroup.find('.active').removeClass('active');
        $(this).parent().addClass('active');
      });
    });

    // Количепство элементов на странице
    var $filterButtons = $('.js__masonry-toggle');

    updateFilterCounts();

    function updateFilterCounts()  {
      // get filtered item elements
      var itemElems = $grid.isotope('getFilteredItemElements');
      var $itemElems = $( itemElems );
      $filterButtons.each( function( i, button ) {
        var $button = $( button );
        var filterValue = $button.attr('data-filter');
        if ( !filterValue ) {
          // do not update 'any' buttons
          return;
        }
        var count = $itemElems.filter( filterValue ).length;
        $button.find('.filter-count').text( '(' + count +')' );
      });
    }
  });


// range slider
  $(function () {
    $('.js__double-range').each(function(index, el) {
      var $range = $(this).find(".js__range-slider"),
          $from = $(this).find(".js__from"),
          $to = $(this).find(".js__to"),
          min = $from.attr('js-min-val'),
          max = $to.attr('js-max-val'),
          range,
          from,
          to;

      var updateValues = function () {
        $from.prop("value", from);
        $to.prop("value", to);
      };

      $range.ionRangeSlider({
        type: 'double',
        min: min,
        max: max,
        keyboard: true,
        hide_min_max: true,
        hide_from_to: true,
        from: $from.attr('value'),
        to: $to.attr('value'),
        step: 10,
        prettify_enabled: true,
        prettify_separator: ".",
        onChange: function (data) {
          from = data.from;
          to = data.to;
          
          updateValues();
        },
        onFinish: function (data) {
          from = data.from;
          to = data.to;
          
          updateValues();
        }
      });

      range = $range.data("ionRangeSlider");

      var updateRange = function () {
        range.update({
          from: from,
          to: to
        });
      };

      $from.on("change", function () {
        from = +$(this).prop("value");
        if (from < min) {
          from = min;
        }
        if (from > to) {
          from = to;
        }

        updateValues();    
        updateRange();
      });

      $to.on("change", function () {
        to = +$(this).prop("value");
        if (to > max) {
          to = max;
        }
        if (to < from) {
          to = from;
        }

        updateValues();    
        updateRange();
      });
    });
  });

// scrollbar
  $(function () {
    $('.scrollbar-outer').scrollbar();
  });


//маска для поля телефон
  $(function () {
    $(".js__phone-mask").mask("+7(999) 999-9999");
  });

// validate form
  $(function () {
    $(".js__validate-form").each(function(index, el) {
      
      $(this).validate({
        rules:{
          email:{
            required: true,
            email: true
          },
        },
        messages:{
          email:{
            email: "Неверный формат"
          },
        }
      });
    });

    // global required messages
    $.validator.messages.required = 'Это обязательное поле';
  });

// catalog menu
  $(function () {
    $('.nav-catalog__btn').click(function(event) {
        var btn = $(this),
            catalog = btn.parent('.nav-catalog'),
            collapse = catalog.children('.nav-catalog__collapse');

        if (collapse.is(':visible')) {
            collapse.hide();
            catalog.removeClass('open');
            $('body').removeClass('catalog-open');
            $('.catalog-overlay').remove();
        } else {
            collapse.show();
            catalog.addClass('open');
            $('body')
              .addClass('catalog-open')
              .append('<div class=\"catalog-overlay\"></div>');
        }
    });

    $(document).on('click', '.catalog-overlay', function(){ 
        $('.catalog-overlay').remove();
        $('body').removeClass('catalog-open');
        $('.nav-catalog__collapse').hide();
        $('.nav-catalog').removeClass('open');
    }); 
  });


// select
  $(document).ready(function() {
    $('.js__select-style').niceSelect();
  });


// category slider
  $(function () {
    $('.category-slider').each(function(index, el) {
      var slider = $(this),
          sliderBlock = slider.find('.slider-block');

      sliderBlock.slick({
        infinite: false,
        speed: 300,
        slidesToShow: 7,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 5000,
        dots: false,
        arrows: true,
        // appendDots: slider.find('.slider-dots'),
        prevArrow: slider.find('.slider-prev'),
        nextArrow: slider.find('.slider-next'),
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 5
            },
          },
          {
            breakpoint: 960,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      });
    });
  });

// three slider
  $(function () {
    $('.three-slider').each(function(index, el) {
      var slider = $(this),
          sliderBlock = slider.find('.slider-block');

      sliderBlock.slick({
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 5000,
        dots: false,
        arrows: true,
        // appendDots: slider.find('.slider-dots'),
        prevArrow: slider.find('.slider-prev'),
        nextArrow: slider.find('.slider-next'),
        responsive: [
          {
            breakpoint: 960,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
    });
  });


// Слайдер на детальной
    $('.detail-slider').each(function(index, el) {
        var slider = $(this),
            sliderMain = slider.find('.detail-slider-main'),
            sliderBlock = sliderMain.find('.slider-block'),
            sliderThumb = slider.find('.slider-thumb'),
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
            prevArrow: sliderMain.find('.slider-prev'),
            nextArrow: sliderMain.find('.slider-next')
        });

        sliderThumbBlock.slick({
            asNavFor: sliderBlock,
            infinite: false,
            focusOnSelect: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            // autoplay: true,
            autoplaySpeed: 5000,
            dots: false,
            arrows: false
        });
    });

// quantity
  $('.quantity__btn').click(function() {
    var $input = $(this).closest('.quantity').find('.quantity__input');

    if ( $(this).hasClass('minus') ) {
        var count = parseInt($input.val()) - 1;    
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    } else {
        var countPlus = parseInt($input.val()) + 1;    
        $input.val(countPlus);
        $input.change();
        return false;
    }
  });


})(jQuery);
//end scripts

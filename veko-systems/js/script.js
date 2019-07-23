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

// Главный слайдер
  $(function () {
    var slider = $('.main-slider'),
        sliderBlock = slider.find('.slider-block');

    $(function () {
      sliderBlock.slick({
        infinite: false,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        dots: true,
        appendDots: slider.find('.slider-dots'),
        prevArrow: slider.find('.slider-prev'),
        nextArrow: slider.find('.slider-next'),
      });
    });

    var slideCount = null,
        slideCountTotal = slider.find('.slide-count__total'),
        slideCountCurrent = slider.find('.slide-count__current');

    sliderBlock.on('init', function(event, slick){
      slideCount = slick.slideCount;
      setSlideCount();
      setCurrentSlideNumber(slick.currentSlide);
    });

    sliderBlock.on('beforeChange', function(event, slick, currentSlide, nextSlide){
      setCurrentSlideNumber(nextSlide);
    });

    function setSlideCount() {
      slideCountTotal.text(slideCount);
    }

    function setCurrentSlideNumber(currentSlide) {
      slideCountCurrent.text(currentSlide + 1);
    }
  });

// Для десктопов
  $(function () {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // sticky header
      $('.top-header').sticky({
        zIndex: 100
      });
    };
  });

// Слайдер клиентов
  $('.carousel-slider').each(function(index, el) {
      var slider = $(this),
          sliderBlock = slider.find('.slider-block');

      sliderBlock.slick({
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          // autoplay: true,
          autoplaySpeed: 5000,
          dots: true,
          appendDots: slider.find('.slider-dots'),
          prevArrow: slider.find('.slider-prev'),
          nextArrow: slider.find('.slider-next'),
          responsive: [
              {
                breakpoint: 1220,
                settings: {
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 578,
                settings: {
                  slidesToShow: 2
                }
              }
          ]
      });
  });

// слайдер с превью справа
  $(function () {
    var slider = $('.triple-slider'),
        sliderBlock = slider.find('.slider-block'),
        sliderThumb = slider.find('.slider-block-nav');

    sliderBlock.slick({
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      // autoplay: true,
      autoplaySpeed: 5000,
      dots: false,
      arrows: false,
      asNavFor: sliderThumb,
    });

    sliderThumb.slick({
      asNavFor: sliderBlock,
      infinite: false,
      vertical: true,
      verticalSwiping: true,
      focusOnSelect: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      // autoplay: true,
      autoplaySpeed: 5000,
      dots: false,
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            vertical: false,
            verticalSwiping: false
          }
        }
      ]
    });
  });

// Простой слайдер
$(function () {
    var slider = $('.simple-slider'),
        sliderBlock = slider.find('.slider-block');

    sliderBlock.slick({
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      // autoplay: true,
      autoplaySpeed: 5000,
      dots: false,
      arrows: true,
      prevArrow: slider.find('.slider-prev'),
      nextArrow: slider.find('.slider-next')
    });
  });

// Для работы object-fit во всех браузерах
  $(function () {
      objectFitImages ();
  });

// Скрытие/открытие блока "Области применения стеллажей"
  $(function () {
    var block = $('#directionBlock'),
        blockHeight = block.innerHeight(),
        section = block.closest('.direction'),
        more = section.find('.more-click');

    $('.direction').find('.more-click').click(function(event) {
      event.preventDefault();

      if (section.hasClass('open')) {
        block.height(blockHeight);
        section.removeClass('open');
        more.text('Показать все');
      } else {
        block.height('auto')
        section.addClass('open');
        more.text('Скрыть');
      }
    });
  });

// Закрытие поиска
  $('.close-search').click(function(event) {
    $('#headerSearch').removeClass('open');
  });

//маска для поля телефон 
    $(".phoneInput").mask("+7(999) 999-9999");


})(jQuery);
//end script

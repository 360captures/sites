  // Gallery Slider //
  let bgSwiper;

  // Функция для создания Swiper
  function initSwiper() {
    $('.t1--slider__content').each(function(index) {
      bgSwiper = new Swiper($(this).find('.swiper.t1--gallery__slider')[0], {
        slidesPerView: "auto",
        speed: 1000,
        breakpoints: {
          240: {
            allowTouchMove: true,
          },
          992: {
            allowTouchMove: false,
          },
        },
      });
    });
  }

  // Функция для разрушения Swiper
  function destroySwiper() {
    if (bgSwiper) {
      bgSwiper.destroy();
    }
  }

  // Проверяем ширину экрана при загрузке страницы
  if ($(window).width() > 991) {
    initSwiper();
  }
  
  if ($(window).width() <= 991) {
    let totalSlides = $('.t1--slider__content').find('.swiper-slide.t1--gallery__image').length;
    $('.t1--open-lightbox').text("View All " + totalSlides + " Photos");
  }

  // Отслеживаем изменения ширины экрана с помощью медиа-запроса
  $(window).on('resize', function () {
    if ($(window).width() > 991) {
      initSwiper();
    } else {
      destroySwiper();
    }
  });

  $('.t1--slider__content').each(function(index) {
    const thumbsSwiper = new Swiper($(this).find('.swiper.t1--gallery__thumbs')[0], {
      allowTouchMove: true,
      speed: 1000,
      slidesPerView: 'auto',
      slideToClickedSlide: true,
      centeredSlides: true,
      spaceBetween: 16,
      mousewheel: {
        forceToAxis: true,
      },
      thumbs: {
        swiper: bgSwiper,
      },
      navigation: {
        nextEl: '.t1--gallery__next',
        prevEl: '.t1--gallery__prev',
      },
    });
  });

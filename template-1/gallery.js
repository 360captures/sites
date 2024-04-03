var bgSwiper;
var thumbsSwiper;

// Функция для создания Swiper
function initSwiper() {
  $('.t1--slider__content').each(function (index) {
    bgSwiper = new Swiper($(this).find('.swiper.t1--gallery__slider')[0], {
      slidesPerView: 1,
      speed: 300,
      slideToClickedSlide: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      allowTouchMove: false,
      mousewheel: {
        forceToAxis: true,
      },
      navigation: {
        nextEl: '.t1--gallery__img-next',
        prevEl: '.t1--gallery__img-prev',
      },
      on: {
        slideChange: function () {
          // При изменении слайда в swiper1, перейти к соответствующему слайду в swiper2
          thumbsSwiper.slideTo(this.activeIndex);
        },
      },
    });
  });
}

function initThumbs() {
  $('.t1--slider__content').each(function (index) {
    thumbsSwiper = new Swiper($(this).find('.swiper.t1--gallery__thumbs')[0], {
      allowTouchMove: true,
      speed: 300,
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
}

function initGalleries() {
  $(document).ready(function () {
    function initGallery() {
      initSwiper();
      initThumbs();
    }

    if ($(window).width() > 991) {
      initGallery();
    }

    function countSlides() {
      let totalSlides = $('.t1--slider__content').find(
        '.swiper-slide.t1--gallery__image'
      ).length;
      $('.t1--open-lightbox').text('View All ' + totalSlides + ' Photos');
    }

    if ($(window).width() <= 991) {
      countSlides();
    }

    function destroySwiper() {
      if (bgSwiper) {
        bgSwiper.destroy();
      }
    }

    let isScreenSmall = $(window).width() <= 991;

    function executeOnScreenResize() {
      const currentIsScreenSmall = $(window).width() <= 991;

      if (currentIsScreenSmall !== isScreenSmall) {
        // Эта часть кода выполнится только, если состояние экрана изменилось.
        if (currentIsScreenSmall) {
          destroySwiper();
          countSlides();
        } else {
          initGallery();
        }

        // Обновляем состояние экрана
        isScreenSmall = currentIsScreenSmall;
      }
    }

    // Вызываем функцию при загрузке страницы и при изменении размера окна
    $(document).ready(function () {
      executeOnScreenResize();

      $(window).resize(function () {
        executeOnScreenResize();
      });
    });
  });
}

var cmsList = document.getElementById('cms-list');
var cmsList2 = document.getElementById('cms-list2');

var changesCompleted = false; // Флаг для отслеживания завершения изменений

function observeChanges(element, callback) {
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'childList') {
        if (!changesCompleted) {
          changesCompleted = true; // Устанавливаем флаг в true после первого вызова
          callback();
        }
      }
    });
  });

  observer.observe(element, { childList: true, subtree: true });
}

// Следим за изменениями
observeChanges(cmsList, myCode);
observeChanges(cmsList2, myCode);

// Функция, которую нужно выполнить после завершения всех изменений
function myCode() {
  initGalleries();
}

// Changes 1
var bgSwiper;
var thumbsSwiper;

// Функция для создания Swiper
function initSwiper() {
    $('.t1--slider__content').each(function(index) {
      bgSwiper = new Swiper($(this).find('.swiper.t1--gallery__slider')[0], {
        slidesPerView: "auto",
        speed: 1000,
        allowTouchMove: false,
      });
    });
}
  
function initThumbs() {
    $('.t1--slider__content').each(function(index) {
        thumbsSwiper = new Swiper($(this).find('.swiper.t1--gallery__thumbs')[0], {
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
}

$(document).ready(function(){
    function initGallery() {
        initSwiper();
        initThumbs();
    }

    if ($(window).width() > 991) {
        initGallery();
    }

    function countSlides() {
        let totalSlides = $('.t1--slider__content').find('.swiper-slide.t1--gallery__image').length;
        $('.t1--open-lightbox').text("View All " + totalSlides + " Photos");
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
    $(document).ready(function() {
    executeOnScreenResize();
    
    $(window).resize(function() {
        executeOnScreenResize();
    });
    });
});

$(document).ready(function () {
  // Очищаем содержимое элемента с классом "t1--schedule-days"
  var $scheduleDays = $(".t1--schedule-days").empty();
  var currentDate = new Date();
  
  // Создаем слайды для 14 дней
  for (var i = 0; i < 14; i++) {
    var date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    
    if (date.getDay() >= 1 && date.getDay() <= 5) {
      var dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
      var monthName = [
        "January", "February", "March", "April", "May", "June", "July", "August", 
        "September", "October", "November", "December"
      ][date.getMonth()];
      
      var $slide = $('<div class="swiper-slide"><div class="t1--day-of-week">' +
        '<div class="t1--weekday-num">' + date.getDate() + '</div>' +
        '<div class="t1--weekday">' + dayOfWeek + '</div>' +
        '<div class="t1--schedule-months">' + monthName + '</div>' +
        '</div></div>');
      
      $scheduleDays.append($slide);
    }
  }
  
  // Устанавливаем начальное состояние активности для первого элемента
  var $firstDayOfWeek = $scheduleDays.children().eq(0).children().eq(0);
  $firstDayOfWeek.addClass("is--active");
  
  // Извлекаем информацию о дне недели, дате и месяце
  var selectedDate = $firstDayOfWeek.find("div.t1--weekday-num").text();
  var selectedDayOfWeek = $firstDayOfWeek.find("div.t1--weekday").text();
  var selectedMonth = $firstDayOfWeek.find("div.t1--schedule-months").text();
  
  // Обновляем заголовок месяца и поле ввода с датой
  $(".t1--schedule__months-title").text(selectedMonth);
  $("#date").val(selectedDate + " " + selectedMonth + " (" + selectedDayOfWeek + ")");
  
  // Обработчик события для клика по дню недели
  $(".t1--day-of-week").on("click", function () {
    $(".t1--day-of-week").removeClass("is--active");
    $(this).addClass("is--active");
    
    selectedDate = $(this).find("div.t1--weekday-num").text();
    selectedDayOfWeek = $(this).find("div.t1--weekday").text();
    selectedMonth = $(this).find("div.t1--schedule-months").text();
    
    $(".t1--schedule__months-title").text(selectedMonth);
    $("#date").val(selectedDate + " " + selectedMonth + " (" + selectedDayOfWeek + ")");
  });
  
  // Инициализация Swiper для слайдера
  new Swiper(".t1--container-schedule-slider", {
    slidesPerView: 5,
    speed: 200,
    loop: false,
    keyboard: true,
    freeMode: false,
    slideToClickedSlide: false,
    navigation: {
      nextEl: ".t1--schedule-next",
      prevEl: ".t1--schedule-prev"
    }
  });
  
  // Установка значения поля "type" на "IN PERSON"
  $("#type").val("IN PERSON");
  
  // Обработчик события для кнопок переключения типа
  $(".t1--schedule-toggle-button").on("click", function () {
    var type = $(this).text().toUpperCase();
    $(".t1--schedule-toggle-button").removeClass("is--active");
    $(this).addClass("is--active");
    $("#type").val(type);
  });
  
  // Определение времени до и после полудня
  const timesBefore = ["1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM"];
  const timesAfter = ["4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 PM"];
  
  // Функция для проверки времени
  function checkTime() {
    var currentTime = new Date().toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
      hour12: true,
      hour: "numeric"
    });
    
    // Остальной код для проверки времени
  }
  
  // Вызываем функцию для проверки времени
  checkTime();
  
  // Инициализация Swiper для слайдера времени
  var timeSwiper = new Swiper(".t1--container-schedule-slider-time", {
    slidesPerView: 5,
    speed: 200,
    loop: false,
    keyboard: true,
    freeMode: false,
    slideToClickedSlide: false,
    navigation: {
      nextEl: ".t1--schedule-time-next",
      prevEl: ".t1--schedule-time-prev"
    }
  });
  
  // Установка значения поля "home" из текста элемента с id "home-name"
  var homeName = $("#home-name").text();
  $("#home").val(homeName);
  
  // Обработчик события для выбора времени
  $(".t1--time").on("click", function () {
    $(".t1--time, .t1--time-type").removeClass("is--active");
    $(this).addClass("is--active");
    
    var timeText = $(this).find("div.t1--time-text").text();
    var timeType = timeText.slice(-2);
    
    $("#time").val(timeText);
    
    if (timeType === "AM") {
      $(".t1--time-type").removeClass("is--active");
      $(".t1--time-type__wrapper").children().eq(0).addClass("is--active");
    } else {
      $(".t1--time-type").removeClass("is--active");
      $(".t1--time-type__wrapper").children().eq(1).addClass("is--active");
    }
  });
});

// 29.09.2023 13.29 //
$(document).ready(function () {
  var $daysContainer = $(".t1--schedule-days").empty();
  var currentDate = new Date();

  for (var i = 0; i < 14; i++) {
    var currentDay = new Date(currentDate);
    currentDay.setDate(currentDate.getDate() + i);

    if (currentDay.getDay() >= 1 && currentDay.getDay() <= 5) {
      var $dayElement = $(
        '<div class="swiper-slide t1--schedule-days-slide"><div class="t1--day-of-week">' +
          '<div class="t1--weekday-num">' +
          currentDay.getDate() +
          "</div>" +
          '<div class="t1--weekday">' +
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
            currentDay.getDay()
          ] +
          "</div>" +
          '<div class="t1--schedule-months">' +
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ][currentDay.getMonth()] +
          "</div>" +
          "</div></div>"
      );
      $daysContainer.append($dayElement);
    }
  }
});

$(document).ready(function () {
  $(".t1--schedule-days")
    .children()
    .eq(0)
    .children()
    .eq(0)
    .addClass("is--active");
  let day = $(".t1--schedule-days")
    .children()
    .eq(0)
    .children()
    .eq(0)
    .find("div.t1--weekday-num")
    .text();
  let weekday = $(".t1--schedule-days")
    .children()
    .eq(0)
    .children()
    .eq(0)
    .find("div.t1--weekday")
    .text();
  let months = $(".t1--schedule-days")
    .children()
    .eq(0)
    .children()
    .eq(0)
    .find("div.t1--schedule-months")
    .text();
  $(".t1--schedule__months-title").text(months);
  $("#date").val(day + " " + months + " " + "(" + weekday + ")");

  $(".t1--day-of-week").on("click", function () {
    $(".t1--day-of-week").removeClass("is--active");
    $(this).addClass("is--active");
    day = $(this).find("div.t1--weekday-num").text();
    weekday = $(this).find("div.t1--weekday").text();
    months = $(this).find("div.t1--schedule-months").text();

    $(".t1--schedule__months-title").text(months);
    $("#date").val(day + " " + months + " " + "(" + weekday + ")");
  });
});

// Schedule Date
const rem = 16;
new Swiper(".t1--container-schedule-slider", {
  slidesPerView: "auto",
  speed: 200,
  loop: false,
  freeMode: false,
  slideToClickedSlide: false,
  navigation: {
    nextEl: ".t1--schedule-next",
    prevEl: ".t1--schedule-prev"
  },
  breakpoints: {
    // when window width is >= 320px
    992: {
      spaceBetween: 0.27 * rem,
    },
    // when window width is >= 480px
    240: {
      spaceBetween: 6,
    }
  }
});

// Form Toggle
$(document).ready(function () {
  $("#type").val("IN PERSON");
});

$(".t1--schedule-toggle-button").on("click", function () {
  let text = $(this).text().toUpperCase();
  $(".t1--schedule-toggle-button").removeClass("is--active");
  $(this).addClass("is--active");
  $("#type").val(text);
});

const timesBefore = [
  "1 AM",
  "2 AM",
  "3 AM",
  "4 AM",
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM"
];

const timesAfter = [
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
  "12 PM"
];

function checkTime() {
  const timeVersion2 = {
    timeZone: "America/New_York",
    hour12: true,
    hour: "numeric"
  };

  let currentTime = new Date().toLocaleTimeString("en-US", timeVersion2);
  const currentDay = $(".t1--schedule-days")
    .children()
    .children()
    .eq(0)
    .eq(0)
    .find("div.t1--weekday-num")
    .text();
  let day = currentDay;

  function timeActive() {
    $(".t1--time").removeClass("is--active");
    $(".t1--schedule-time")
      .children()
      .filter(":not(.is--disabled)")
      .first()
      .children()
      .eq(0)
      .addClass("is--active");
    let timeType = $(".t1--time.is--active")
      .find("div.t1--time-type-text")
      .text();
    let timeChecker = timeType.slice(-2);
    $("#time").val(timeType);

    if (timeChecker === "AM") {
      $(".t1--time-type").removeClass("is--active");
      $(".t1--time-type__wrapper").children().eq(0).addClass("is--active");
    } else {
      $(".t1--time-type").removeClass("is--active");
      $(".t1--time-type__wrapper").children().eq(1).addClass("is--active");
    }

    let count = $(".swiper-slide.is--disabled").length;
    console.log(count);

    if (count >= 9) {
      $(".t1--schedule-slider-time").addClass("is--disabled");
      $(".t1--no-time").removeClass("is--disabled");
    }
  }

  function checkDate() {
    if (day === currentDay) {
      if (timesAfter.includes(currentTime)) {
        $(".t1--schedule-slider-time").addClass("is--disabled");
        $(".t1--no-time").removeClass("is--disabled");
        console.log("Disabled");
      } else if (currentTime === "7 AM") {
        $(".t1--schedule-time").children().eq(0).addClass("is--disabled");
      } else if (currentTime === "8 AM") {
        $(".t1--schedule-time").children().slice(0, 2).addClass("is--disabled");
      } else {
        $(".t1--time-type-text").each(function () {
          let i = $(this).parent().parent().index();
          let timeText = $(this).text();
          if (timeText === currentTime) {
            $(".t1--schedule-time").children().slice(i, i + 3).addClass("is--disabled");
            $(".t1--schedule-time").children().eq(i).prevAll().addClass("is--disabled");
          }
          timeSwiper.update();
        });
      }
    } else {
      $(".t1--schedule-slider-time").removeClass("is--disabled");
      $(".t1--no-time").addClass("is--disabled");
      console.log("Enabled");
    }
  }
  checkDate();
  timeActive();

  $(".t1--day-of-week").on("click", function () {
    day = $(this).find("div.t1--weekday-num").text();
    $(".swiper-slide").removeClass("is--disabled");
    checkDate();
    timeActive();
    timeSwiper.update();
  });
}

$(document).ready(function () {
  checkTime();
});

// Schedule Time
var timeSwiper = new Swiper(".t1--container-schedule-slider-time", {
  slidesPerView: "auto",
  speed: 200,
  loop: false,
  freeMode: false,
  slideToClickedSlide: false,
  navigation: {
    nextEl: ".t1--schedule-time-next",
    prevEl: ".t1--schedule-time-prev"
  },
  breakpoints: {
    // when window width is >= 320px
    992: {
      spaceBetween: 0.27 * rem,
    },
    // when window width is >= 480px
    240: {
      spaceBetween: 6,
    }
  }
});

// Time
$(document).ready(function () {
  let time = $(".t1--schedule-time")
    .children()
    .eq(0)
    .children()
    .eq(0)
    .find("div.t1--time-text")
    .text();

  let homeName = $("#home-name").text();
  $("#home").val(homeName);
});

$(".t1--time").on("click", function () {
  $(".t1--time, .t1--time-type").removeClass("is--active");
  $(this).addClass("is--active");
  let time = $(this).find("div.t1--time-text").text();
  let timeType = $(this).find("div.t1--time-type-text").text();
  let timeChecker = timeType.slice(-2);
  $("#time").val(timeType);

  if (timeChecker === "AM") {
    $(".t1--time-type").removeClass("is--active");
    $(".t1--time-type__wrapper").children().eq(0).addClass("is--active");
  } else {
    $(".t1--time-type").removeClass("is--active");
    $(".t1--time-type__wrapper").children().eq(1).addClass("is--active");
  }
});

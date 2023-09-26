$(document).ready(function () {
    for (
      var e = $(".t1--schedule-days").empty(), t = new Date(), i = 0;
      i < 14;
      i++
    ) {
      var d = new Date(t);
      if ((d.setDate(t.getDate() + i), d.getDay() >= 1 && d.getDay() <= 5)) {
        var s = $(
          '<div class="swiper-slide"><div class="t1--day-of-week"><div class="t1--weekday-num">' +
            d.getDate() +
            '</div><div class="t1--weekday">' +
            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()] +
            '</div><div class="t1--schedule-months">' +
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
            ][d.getMonth()] +
            "</div></div></div>"
        );
        e.append(s);
      }
    }
  }),
    $(document).ready(function () {
      $(".t1--schedule-days")
        .children()
        .eq(0)
        .children()
        .eq(0)
        .addClass("is--active");
      let e = $(".t1--schedule-days")
          .children()
          .eq(0)
          .children()
          .eq(0)
          .find("div.t1--weekday-num")
          .text(),
        t = $(".t1--schedule-days")
          .children()
          .eq(0)
          .children()
          .eq(0)
          .find("div.t1--weekday")
          .text(),
        i = $(".t1--schedule-days")
          .children()
          .eq(0)
          .children()
          .eq(0)
          .find("div.t1--schedule-months")
          .text();
      $(".t1--schedule__months-title").text(i),
        $("#date").val(e + " " + i + " (" + t + ")"),
        $(".t1--day-of-week").on("click", function () {
          $(".t1--day-of-week").removeClass("is--active"),
            $(this).addClass("is--active"),
            (e = $(this).find("div.t1--weekday-num").text()),
            (t = $(this).find("div.t1--weekday").text()),
            (i = $(this).find("div.t1--schedule-months").text()),
            $(".t1--schedule__months-title").text(i),
            $("#date").val(e + " " + i + " (" + t + ")");
        });
    }),
    new Swiper(".t1--container-schedule-slider", {
      slidesPerView: 5,
      speed: 200,
      loop: !1,
      keyboard: !0,
      freeMode: !1,
      slideToClickedSlide: !1,
      navigation: {
        nextEl: ".t1--schedule-next",
        prevEl: ".t1--schedule-prev"
      }
    }),
    $(document).ready(function () {
      $("#type").val("IN PERSON");
    }),
    $(".t1--schedule-toggle-button").on("click", function () {
      let e = $(this).text().toUpperCase();
      $(".t1--schedule-toggle-button").removeClass("is--active"),
        $(this).addClass("is--active"),
        $("#type").val(e);
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
    ],
    timesAfter = [
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
    let e = new Date().toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
      hour12: !0,
      hour: "numeric"
    });
    const t = $(".t1--schedule-days")
      .children()
      .children()
      .eq(0)
      .eq(0)
      .find("div.t1--weekday-num")
      .text();
    let i = t;
  
    function d() {
      $(".t1--time").removeClass("is--active"),
        $(".t1--schedule-time")
          .children()
          .filter(":not(.is--disabled)")
          .first()
          .children()
          .eq(0)
          .addClass("is--active");
      let e = $(".t1--time.is--active").find("div.t1--time-type-text").text(),
        t = e.slice(-2);
      $("#time").val(e),
        "AM" === t
          ? ($(".t1--time-type").removeClass("is--active"),
            $(".t1--time-type__wrapper").children().eq(0).addClass("is--active"))
          : ($(".t1--time-type").removeClass("is--active"),
            $(".t1--time-type__wrapper").children().eq(1).addClass("is--active")),
        8 <= $(".swiper-slide.is--disabled").length &&
          ($(".t1--schedule-slider-time").addClass("is--disabled"),
          $(".t1--no-time").removeClass("is--disabled"));
    }
  
    function s() {
      i === t
        ? timesAfter.includes(e)
          ? ($(".t1--schedule-slider-time").addClass("is--disabled"),
            $(".t1--no-time").removeClass("is--disabled"))
          : "7 AM" === e
          ? $(".t1--schedule-time").children().eq(0).addClass("is--disabled")
          : "8 AM" === e
          ? $(".t1--schedule-time")
              .children()
              .slice(0, 2)
              .addClass("is--disabled")
          : $(".t1--time-type-text").each(function () {
              let t = $(this).parent().parent().index();
              $(this).text() === e &&
                ($(".t1--schedule-time")
                  .children()
                  .slice(t, t + 3)
                  .addClass("is--disabled"),
                $(".t1--schedule-time")
                  .children()
                  .eq(t)
                  .prevAll()
                  .addClass("is--disabled")),
                timeSwiper.update();
            })
        : ($(".t1--schedule-slider-time").removeClass("is--disabled"),
          $(".t1--no-time").addClass("is--disabled"));
    }
    s(),
      d(),
      $(".t1--day-of-week").on("click", function () {
        (i = $(this).find("div.t1--weekday-num").text()),
          $(".swiper-slide").removeClass("is--disabled"),
          s(),
          d(),
          timeSwiper.update();
      });
  }
  $(document).ready(function () {
    checkTime();
  });
  var timeSwiper = new Swiper(".t1--container-schedule-slider-time", {
    slidesPerView: 5,
    speed: 200,
    loop: !1,
    keyboard: !0,
    freeMode: !1,
    slideToClickedSlide: !1,
    navigation: {
      nextEl: ".t1--schedule-time-next",
      prevEl: ".t1--schedule-time-prev"
    }
  });
  $(document).ready(function () {
    $(".t1--schedule-time")
      .children()
      .eq(0)
      .children()
      .eq(0)
      .find("div.t1--time-text")
      .text();
    let e = $("#home-name").text();
    $("#home").val(e);
  }),
    $(".t1--time").on("click", function () {
      $(".t1--time, .t1--time-type").removeClass("is--active"),
        $(this).addClass("is--active");
      $(this).find("div.t1--time-text").text();
      let e = $(this).find("div.t1--time-type-text").text(),
        t = e.slice(-2);
      $("#time").val(e),
        "AM" === t
          ? ($(".t1--time-type").removeClass("is--active"),
            $(".t1--time-type__wrapper").children().eq(0).addClass("is--active"))
          : ($(".t1--time-type").removeClass("is--active"),
            $(".t1--time-type__wrapper").children().eq(1).addClass("is--active"));
    });
  

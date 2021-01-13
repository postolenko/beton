var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

function getAnimation() {
  $(".animate").each(function() {
    if( $(this).offset().top <= $(document).scrollTop() + $(window).height() ) {
      $(this).addClass("active");
    }
  });
}

function getPromoPadding() {
  if($("#promo").length > 0) {
    $("#promo").css({
      "padding-top": $(".header_site").height() + "px"
    });
  }
}


$(window).load(function() {

$(".tabs").each(function() {
    $(this).find(".tab-link").each(function() {
        if( $(this).hasClass("active") ) {
            indexActiveTab = $(this).attr("for");
            return false;
        } else {
            parentBlock = $(this).closest(".tabs");
            indexActiveTab = parentBlock.find(".tab-link:eq(0)").attr("for");
        }
    });
    $(this).find("#"+indexActiveTab).prop("checked", true);
    $(this).find("[for = '"+indexActiveTab+"']").addClass("active");
});



});

$(window).resize(function() {
  getPromoPadding();
  getAnimation();
  bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
});

$(document).scroll(function() {
    getAnimation();
});

$(document).ready(function() {
    getPromoPadding();
    getAnimation();
    bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

    // ------------

    $(".tab-link").click(function (e) {
      if( $(this).hasClass("active") ) {
          e.preventDefault();
      } else {
          tabsParent = $(this).closest(".tabs");
          attrForTabLink = $(this).attr("for");
          activeTabRadio = tabsParent.find(".radio-tab[id = '"+ attrForTabLink +"']");
          activeTabRadio.prop("checked", true);
          tabsParent.find(".tab-link").each(function () {                
              if( $(this).hasClass("active") ) {
                  $(this).removeClass("active")
              }
          });
          $(this).addClass("active");
      }
    });

    // --------

    if($("#map_1").length > 0) {
      ymaps.ready(function () {        
          var myMap = new ymaps.Map('map_1', {
              center: [55.755814, 37.617635],
              zoom: 14
          }, {
              searchControlProvider: 'yandex#search'
          });
          myPlacemark1 = new ymaps.Placemark([55.755814, 37.617635], {
              hintContent: ''
          }, {
              // iconLayout: 'default#imageWithContent',
              // iconImageHref: 'img/yellow_marker.png',
              // iconImageSize: [39, 35],
              // iconImageOffset: [19, -17]
          });
          myMap.geoObjects.add(myPlacemark1);        
      });
    }

    // ------------

    $("[data-popup-link]").on("click", function(e) {
        e.preventDefault();
        popupName = $(this).attr("data-popup-link");
        div = document.createElement('div');
        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        scrollWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);
        $("body").addClass("fixed");
        $("body").css({
            "position" : "fixed",
            "top" :  -$(document).scrollTop() + "px",
            "overflow" : "hidden",
            "right" : 0,
            "left" : 0,
            "bottom" : 0,
            "padding-right" : scrollWidth + "px"
        });
        $(".popup_bg").fadeIn(300);
        $("[data-popup = '"+ popupName +"']").fadeIn(300);
    });
    $(".close_popup, .popup_bg").on("click", function(e) {
        e.preventDefault();
        curTop = $("body").css("top");
        curTop = Math.abs(parseInt(curTop, 10));
        $("body").attr("style", "");
        if (curTop !== 0) {
            $("html").scrollTop(curTop);
        }
        $("body").removeClass("fixed");
        $(".popup_bg").fadeOut(300);
        $("[data-popup]").fadeOut(300);
    });
    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 ) {
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").attr("style", "");
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").removeClass("fixed");
            $(".popup_bg").fadeOut(300);
            $("[data-popup]").fadeOut(300);
        }
    });
    $(document).on("mouseup", function(e) {
      if($(".popup").is(":visible")) {
        e.preventDefault();
        hide_element = $(".popup_content");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").attr("style", "");
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").removeClass("fixed");
            $(".popup_bg").fadeOut(300);
            $("[data-popup]").fadeOut(300);
        }
      }
    });

    // ------------

    $('.main_nav a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      var hrefAttr = $(this).attr("href");
      if( hrefAttr.length > 0 && hrefAttr != "#" ) {
          $('html, body').stop().animate({
              'scrollTop': $(hrefAttr).offset().top+2
          }, 500);
      }
      if($("#resp_nav").is(":visible") && bodyWidth <= 900) {
        $("#resp_nav").fadeOut(300);
        $(".respmenubtn").removeClass("active");
      }
    });

    $('.logo').on('click', function (e) {
      e.preventDefault();
      $('html, body').stop().animate({
          'scrollTop': 0
      }, 500);
    });

    // ------------

    $(".respmenubtn").click(function(e) {
        e.preventDefault();
        if( $("#resp_nav").is(":hidden") ) {
            $("#resp_nav").fadeIn(300);
            $(this).addClass("active");
        } else {
            $("#resp_nav").fadeOut(300);
            $(this).removeClass("active");
        }
    });
    
    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 &&
            $("#resp_nav").is(":visible") &&
            bodyWidth <= 900) {
                $("#resp_nav").fadeOut(300);
                $(".respmenubtn").removeClass("active");
        }
    });

});
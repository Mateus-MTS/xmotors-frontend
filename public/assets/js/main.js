/**
    * btnmenu
    * video
    * Sticky
    * gotop
    * retinaLogos
    * flatCounter
    * Toggle Btn dashboard
    * btn filter
    * dot car
    * niceSelect
*/

; (function ($) {
  
    var video = function () {
      if ($('div').hasClass('video-wrap')) {
        $('.popup-youtube').magnificPopup({
          type: 'iframe'
        });
      }
    };
  
    var goTop = function () {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 800) {
          $('.button-go').addClass('show');
        } else {
          $('.button-go').removeClass('show');
        }
      });
  
      $('.button-go').on('click', function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
      });  };
  
    var flatCounter = function () {
      if ($(document.body).hasClass('counter-scroll')) {
        var a = 0;
        $(window).scroll(function () {
          var oTop = $('.tf-counter').offset().top - window.innerHeight;
          if (a === 0 && $(window).scrollTop() > oTop) {
            if ($().countTo) {
              $('.tf-counter').find('.number').each(function () {
                var to = $(this).data('to'),
                  speed = $(this).data('speed');
  
                $(this).countTo({
                  to: to,
                  speed: speed
                });
              });
            }
            a = 1;
          }
        });
      }
    };
  
    //Menu Toggle Btn dashboard
    $('.btn-show-dashboard').on('click', function () {
      $('.sidebar-dashboard').addClass('active');
      $('.overlay-dashboard').addClass('active');
    });
    $('.overlay-dashboard').on('click', function () {
      $('.sidebar-dashboard').removeClass('active');
      $('.overlay-dashboard').removeClass('active');
    });
  
    $(".filter-header-list .btn-filter i").click(function () {
      $('.list-filter').slideToggle('');
    });
  
    $(".dot").click(function () {
      $(this).find('i').toggleClass("active");
      $(this).find('.content-price').toggleClass("active");
    });
  
    $(document).ready(function () {
      $(".item-dot").on("mouseover", function () {
        // when you run event hover remove class active before
        $('.item-dot').removeClass('active');
        // active class item your run function
        $(this).addClass('active');
      });
    });
  
    // Dom Ready
    $(function () {
      video();
      goTop();
      flatCounter();
    });
  
  })(jQuery);
  
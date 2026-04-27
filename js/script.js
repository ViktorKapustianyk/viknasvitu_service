// Smooth scroll blocking
document.addEventListener( 'DOMContentLoaded', function() {
	if ( 'onwheel' in document ) {
		window.onwheel = function( event ) {
			if( typeof( this.RDSmoothScroll ) !== undefined ) {
				try { window.removeEventListener( 'DOMMouseScroll', this.RDSmoothScroll.prototype.onWheel ); } catch( error ) {}
				event.stopPropagation();
			}
		};
	} else if ( 'onmousewheel' in document ) {
		window.onmousewheel= function( event ) {
			if( typeof( this.RDSmoothScroll ) !== undefined ) {
				try { window.removeEventListener( 'onmousewheel', this.RDSmoothScroll.prototype.onWheel ); } catch( error ) {}
				event.stopPropagation();
			}
		};
	}

	try { $('body').unmousewheel(); } catch( error ) {}
});

function include(scriptUrl) {
    document.write('<script src="' + scriptUrl + '"></script>');
}

function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};

/* cookie.JS
 ========================================================*/
include('js/jquery.cookie.js');

/* Easing library
 ========================================================*/
include('js/jquery.easing.1.3.js');

/* ToTop
 ========================================================*/
;
(function ($) {
    var o = $('html');
    if (o.hasClass('desktop')) {
        include('js/jquery.ui.totop.js');

        $(document).ready(function () {
            $().UItoTop({
                easingType: 'easeOutQuart',
                containerClass: 'toTop fa fa-chevron-up'
            });
        });
    }
})(jQuery);

/* EqualHeights
 ========================================================*/
;
(function ($) {
    var o = $('[data-equal-group]');
    if (o.length > 0) {
        include('js/jquery.equalheights.js');
    }
})(jQuery);

/* SMOOTH SCROLLIG
 ========================================================*/
;
(function ($) {
    var o = $('html');
    if (o.hasClass('desktop')) {
        include('js/jquery.mousewheel.min.js');
        include('js/jquery.simplr.smoothscroll.min.js');

        $(document).ready(function () {
            $.srSmoothscroll({
                step: 150,
                speed: 800
            });
        });
    }
})(jQuery);

/* Copyright Year
 ========================================================*/
;
(function ($) {
    var currentYear = (new Date).getFullYear();
    $(document).ready(function () {
        $("#copyright-year").text((new Date).getFullYear());
    });
})(jQuery);

/* Google Map
 ========================================================*/
;
(function ($) {
    var o = document.getElementById("google-map");
    if (o) {
        include('https://maps.googleapis.com/maps/api/js?key=AIzaSyACrsUCnvQ8txcTJEDLPgj9oVrCrs5g07A');
        include('js/jquery.rd-google-map.js');

        $(document).ready(function () {
            var o = $('#google-map');
            if (o.length > 0) {
                o.googleMap();
            }
        });
    }
})
(jQuery);

/* WOW
 ========================================================*/
;
(function ($) {
    var o = $('html');

    if ((navigator.userAgent.toLowerCase().indexOf('msie') == -1 ) || (isIE() && isIE() > 9)) {
        if (o.hasClass('desktop')) {
            include('js/wow.js');

            $(document).ready(function () {
                // Disable live DOM наблюдение: в старой версии WOW это вызывает падение
                // на некоторых узлах (text/comment) с ошибкой getElementsByClassName.
                new WOW({live: false}).init();
            });
        }
    }
})(jQuery);

/* Contact Form
 ========================================================*/
;
(function ($) {
    var o = $('#contact-form');
    if (o.length > 0) {
        include('js/modal.js');
        include('js/TMForm.js');

        if ($('#contact-form .recaptcha').length > 0) {
            include('//www.google.com/recaptcha/api/js/recaptcha_ajax.js');
        }
    }
})(jQuery);

/* Orientation tablet fix
 ========================================================*/
$(function () {
    // IPad/IPhone
    var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
        ua = navigator.userAgent,

        gestureStart = function () {
            viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6, initial-scale=1.0";
        },

        scaleFix = function () {
            if (viewportmeta && /iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua)) {
                viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
                document.addEventListener("gesturestart", gestureStart, false);
            }
        };

    scaleFix();
    // Menu Android
    if (window.orientation != undefined) {
        var regM = /ipod|ipad|iphone/gi,
            result = ua.match(regM);
        if (!result) {
            $('.sf-menus li').each(function () {
                if ($(">ul", this)[0]) {
                    $(">a", this).toggle(
                        function () {
                            return false;
                        },
                        function () {
                            window.location.href = $(this).attr("href");
                        }
                    );
                }
            })
        }
    }
});
var ua = navigator.userAgent.toLocaleLowerCase(),
    regV = /ipod|ipad|iphone/gi,
    result = ua.match(regV),
    userScale = "";
if (!result) {
    userScale = ",user-scalable=0"
}
document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0' + userScale + '">');

/* Camera
 ========================================================*/
;
(function ($) {
    var o = $('#camera');
    if (o.length > 0) {
        if (!(isIE() && (isIE() > 9))) {
            include('js/jquery.mobile.customized.min.js');
        }

        include('js/camera.js');

        $(document).ready(function () {
            o.camera({
                autoAdvance: true,
                height: '58%',
                minHeight: '350px',
                pagination: false,
                thumbnails: false,
                playPause: false,
                hover: false,
                loader: 'none',
                navigation: true,
                navigationHover: false,
                mobileNavHover: false,
                fx: 'simpleFade'
            })
        });
    }
})(jQuery);

/* Phone Formatting & Date Restrictions
 ========================================================*/
;
(function ($) {
    $(document).ready(function () {
        // Форматирование номера телефону: +380 + 8 цифр
        var phoneInput = $('input[name="Телефон"]');
        if (phoneInput.length > 0) {
            phoneInput.on('input', function() {
                var value = $(this).val().replace(/\D/g, '');
                
                // Якщо користувач вводить 38, то залишаємо її
                // Інакше приймаємо перші 10 цифр (без 38)
                if (value.startsWith('38')) {
                    value = value.substring(2);
                }
                
                // Обмежуємо до 10 цифр (38 + 10 = 12 цифр)
                value = value.substring(0, 10);
                
                // Форматуємо: +380 XX XXX XXXX
                if (value.length === 0) {
                    $(this).val('');
                } else if (value.length <= 2) {
                    $(this).val('+38-' + value);
                } else if (value.length <= 5) {
                    $(this).val('+38-' + value.substring(0, 2) + ' ' + value.substring(2));
                } else {
                    $(this).val('+38-' + value.substring(0, 2) + ' ' + value.substring(2, 5) + ' ' + value.substring(5));
                }
            });

            // При blur, якщо номер неповний, показуємо помилку
            phoneInput.on('blur', function() {
                var value = $(this).val().replace(/\D/g, '');
                if (value.startsWith('38')) {
                    value = value.substring(2);
                }
                
                if ($(this).val() && value.length !== 10) {
                    $(this).val('');
                } else if (!$(this).val()) {
                    $(this).val('');
                }
            });
        }

        // Запрет вибору дат з минулого в datepicker
        var dateInput = $('input[name="Дата заміру"]');
        if (dateInput.length > 0) {
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            
            // Очищаємо попередні налаштування datepicker
            try { dateInput.datepicker('destroy'); } catch(e) {}
            
            dateInput.datepicker({
                minDate: today
            });
        }
    });
})(jQuery);

/* Booking Form
 ========================================================*/
;
(function ($) {
    var o = $('#bookingForm');
    if (o.length > 0) {
        include('js/booking/booking.js');
        include('js/booking/jquery-ui-1.10.3.custom.min.js');
        include('js/booking/jquery.fancyform.js');
        include('js/booking/jquery.placeholder.js');
        include('js/booking/regula.js');
        $(document).ready(function () {
            o.bookingForm({
                // Formspree endpoint: после регистрации на formspree.io замените xeevwdle
                url: 'https://formspree.io/f/xeevwdle',
                successMessage: "Дякуємо! Заявку відправлено. Ми зв'яжемося з вами найближчим часом."
            });
        });
    }
})(jQuery);

/* FancyBox
 ========================================================*/
;
(function ($) {
    var o = $('.thumb');
    if (o.length > 0) {
        include('js/jquery.fancybox.js');
        include('js/jquery.fancybox-media.js');
        include('js/jquery.fancybox-buttons.js');
        $(document).ready(function () {
            o.fancybox();
        });
    }
})(jQuery);
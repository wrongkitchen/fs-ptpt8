(function ($) {

    $.fn.extend({
        DivSlider: function (options) {
            var defaults = {
                el: this.selector,
                speed: 500,
                time: 2000,
                next: '',
                prev: '',
                nav: '',
                auto: false,
                overPause: false,
                navTriggerEvent: "click",
                beforeSlide: function () { },
                afterSlide: function () { }
            }
            var options = $.extend(defaults, options);
            var animating = false;
            var interval = '';
            var handler = new Object();
            var currentIndex = 1;

            var initClone = function () {
                var firstItem = $(options.el).children().eq(0).children().eq(0).clone();
                var lastItem = $(options.el).children().eq(0).children().last().clone();
                $(options.el).children().eq(0).append(firstItem);
                $(options.el).children().eq(0).prepend(lastItem);
                jumpTo(1);
                initNav();
            }

            var initButton = function () {
                if (options.next != "") {
                    $(options.next).click(function () {
                        if (interval != "") {
                            stopInterval();
                        }
                        next();
                    });
                }
                if (options.prev != "") {
                    $(options.prev).click(function () {
                        if (interval != "") {
                            stopInterval();
                        }
                        prev();
                    });
                }
            }

            var initNav = function () {
                if (options.nav != "") {
                    var slideNum = $(options.el).children().eq(0).children().length;
                    //$(options.nav).empty();

                    if ($(options.nav).html() == '') {
                        for (var i = 0; i < slideNum - 2; i++) {
                            if (i == 0) {
                                $(options.nav).append("<a href='/CN/AboutUs'></a>");
                            } else 
                                $(options.nav).append("<a href='/CN/Promotions' ></a>"); 
                            }
                        }
                    }
                    for (i = 0; i < $(options.nav).find("a").length; i++) {
                        $(options.nav).find("a").eq(i).bind(options.navTriggerEvent, function () {
                            if (interval != "") {
                                stopInterval();
                            }
                            goTo($(this).index() + 1);
                        });
                    }
                }
            }

            var initEventHandler = function () {
                if (options.overPause) {
                    $(options.el).bind("mouseover", function () {
                        stopInterval();
                    });
                    $(options.el).bind("mouseout", function () {
                        startInterval();
                    });
                }
            }

            var indexPosition = function (index) {
                return index * ($(options.el).width()) * -1;
            }

            var positionIndex = function (pos) {
                Math.abs(pos) / $(options.el).width();
                return Math.abs(pos) / $(options.el).width();
            }

            var getCurrentIndex = function () {
                return currentIndex;
            }

            var jumpTo = function (index) {
                $(options.el).children().eq(0).css("left", indexPosition(index) + "px");
            }

            var goTo = function (index) {
                if (index) {
                    if (!animating) {
                        animating = true;
                        stopInterval();
                        beforeSlide();

                        currentIndex = index;
                        moveSlider();
                    }
                }

            }

            var next = function () {
                if (!animating) {
                    animating = true;
                    beforeSlide();
                    stopInterval();

                    currentIndex += 1;
                    moveSlider();
                }
            }

            var prev = function () {
                if (!animating) {
                    animating = true;
                    beforeSlide();
                    stopInterval();

                    currentIndex -= 1;
                    moveSlider();
                }
            }

            var afterSlide = function () {
                options.afterSlide($(options.el), getCurrentIndex());
            }

            var beforeSlide = function () {
                options.beforeSlide($(options.el), getCurrentIndex());
            }

            var checkNavActive = function () {
                if (options.nav != "") {
                    $(options.nav).find("a").removeClass("active");
                    $(options.nav).find("a").eq(currentIndex - 1).addClass("active");
                }
            }

            var moveSlider = function () {
                var pos = (currentIndex * $(options.el).width()) * -1;
                $(options.el).children().eq(0).animate({ left: pos }, options.speed, function () {
                    startInterval();
                    checkNavActive();
                    checkIndex();
                    afterSlide();
                    animating = false;
                });
            }

            var checkIndex = function () {
                if (currentIndex == 0) {
                    currentIndex = $(options.el).children().eq(0).children().length - 2;
                } else if (currentIndex == $(options.el).children().eq(0).children().length - 1)
                    currentIndex = 1;

                jumpTo(currentIndex);
                checkNavActive();
            }


            var startInterval = function () {
                if (options.auto) {
                    if (interval == "") {
                        interval = setInterval(function () {
                            next();
                        }, options.time);
                    } else return false;
                }
            }

            var stopInterval = function () {
                if (interval) {
                    clearInterval(interval);
                    interval = "";
                } else return false;
            }

            var initHandler = function () {
                handler.next = next;
                handler.prev = prev;
                handler.goTo = goTo;
                handler.getCurrentIndex = getCurrentIndex;
                handler.stopSlider = stopInterval;
                handler.startSlider = startInterval;

                return handler;
            }

            this.each(function () {
                if ($(options.el).children().eq(0).children().length > 1) {
                    initButton();
                    initClone();
                    initEventHandler();

                    checkNavActive();
                    startInterval();
                }
            });

            return initHandler();
        }
    });

})(jQuery);
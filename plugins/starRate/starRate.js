;(function(window, document, $, undefined) {

    "use strict";

    /**
     * starRate
     *
     * (c) 2017, findawayer | MIT license
     * 
     * Display a rating value on both star icons and plain text forms.
     * Users are able to dynamically select/correct their personal rating.
     *
     * @dependencies: jQuery (any version)
     *
     * @param defaultLength {Number}     initial rating value.
     * @param maxLength {Number}         maximum rating value.
     * @param displayText {Boolean}      whether you want the rating text displayed, `false` as default.
     * @param starClass {String}         class name for each star element. "r-star" as default.
     * @param activeStarClass {String}   class name for active star elements. "is-active" as default.
     * @param starClass {String}         class name for star elements wrapper. "r-stars" as default.
     * @param textClass {String}         class name for text element. "r-text" as default.
     * @param onUpdate {Function}        callback function to execute on rating change.
     *                                   current rating will be passed as parameter.
     */
    $.fn.starRate = function(config) {

        // default settings
        var defaults = {
            defaultLength: 0,
            maxLength: 5,
            displayText: false,
            starClass: "r-star",
            activeStarClass: "is-active",
            starWrapperClass: "r-stars",
            textClass: "r-text",
            onUpdate: undefined
        };
        var o = {}; // merged settings
        var stars = []; // array containing every star node
        var $text; // jQuery object of text node
        var $obj; // jQuery object on which `.starRate()` method is applied

        return $(this).each( function() {
            $obj = $(this);

            // error handling
            if (!$obj[0]) {
                throw Error("Selected element does not exist.");
            }
            if (config.defaultLength > config.maxLength) {
                throw Error("defaultLength value must be smaller or equal than maxLength value.");
            }

            // store merged "default settings" and "user config" into variable "o"
            if (!$.isEmptyObject(config))
                $.extend(o, defaults, config);

            // initiate
            $obj.init = function() {
                // add star icons & text according to the user config
                $obj.addStars().addText();

                // update rating by clicking on a star icon
                $obj.on("click", "i", function() {
                    $obj.updateRating($(this).data("rating"));
                });
            };

            // insert star icons
            // @return {jQuery object}   jQuery starRate instance (for chaining support)
            $obj.addStars = function(boolean) {
                var wrapper, star;

                // group stars in a wrapper if the user wants to the text displayed
                if (o.displayText) {
                    wrapper = document.createElement("span");
                    $obj[0].appendChild(wrapper);
                } else {
                    wrapper = $obj[0];
                }

                // add a class to the wrapper to ease styling
                $(wrapper).addClass(o.starWrapperClass);

                // prevent the container from being mapped to the accessibility API
                wrapper.setAttribute("role", "presentation");
                wrapper.setAttribute("aria-hidden", "true");
                
                // make as many star elements as required
                for (var i = 0; i < o.maxLength; i++) {
                    star = document.createElement("i");
                    star.className = i < o.defaultLength ? o.starClass + " " + o.activeStarClass : o.starClass;
                    star.setAttribute("data-rating", i+1);
                    stars.push(star); // add star elements into `stars` array to ease afterward manipulation
                    wrapper.appendChild(star); // append star to the container
                }

                return $obj; // chaning support
            };

            // add rating text
            // @return {jQuery object}   jQuery starRate instance (for chaining support)
            $obj.addText = function() {
                if (!o.displayText) return;

                var text;
                // add a <span /> element displaying current rating
                text = document.createElement("span");
                text.className = o.textClass;
                text.appendChild(document.createTextNode(o.defaultLength));

                $text = $(text);
                $text.appendTo($obj);

                return $obj; // chaning support
            };

            // update star icons and text
            // @return {jQuery object}   jQuery starRate instance (for chaining support)
            $obj.updateRating = function(ratingString) {
                // convert rating string to number
                o.currentRating = Number(ratingString);
                // update stars and rating
                $obj.updateStars().updateText();

                // if a callback function is supplied, execute it
                if (o.onUpdate && typeof o.onUpdate == "function")
                    o.onUpdate(o.currentRating); // pass current rating

                return $obj;
            };

            // update the star icons
            // @return {jQuery object}   jQuery starRate instance (for chaining support)
            $obj.updateStars = function() {
                var i, $star;

                for (i = stars.length; i >= 0; i--) {
                    $star = $(stars[i]);
                    if (i < o.currentRating) $star.addClass(o.activeStarClass); else $star.removeClass(o.activeStarClass);
                }
                
                return $obj;
            };

            // update the text
            // @return {jQuery object}   jQuery starRate instance (for chaining support)
            $obj.updateText = function() {
                if (!o.displayText) return;
                $text.text(o.currentRating);

                return $obj;
            };

            // start the initiation on document ready
            $(document).ready(function() {
                $obj.init();
            });

        });
    };

})(window, document, jQuery);
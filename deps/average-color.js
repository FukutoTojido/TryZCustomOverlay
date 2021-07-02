/**
 * average-color.js
 *
 * An early code snippet to get the average color from an image. This snippet
 * was originally created as a super quick sample for learning purposes.
 *
 * The implementation could be drastically improved, but this has been kept as
 * is for prosperity sake.
 *
 * @license WTFPL http://www.wtfpl.net/
 * @author William Duyck <fuzzyfox0@gmail.com>
 */

/**
 * Get the background color of a given background image by CSS selector
 *
 * @function
 *
 * @param {string} selector               The CSS selector for the element to sample.
 * @param {string} [default_color='#000'] A fallback color to use if samplaing fails.
 *
 * @return {string} CSS color string for the average color of the sampled image,
 *                  else the `default_color` value is used.
 */
var get_bg_color = (function(window, undefined) {
    return function(selector, default_color) {
        if (typeof default_color === 'undefined') {
            default_color = '#000';
        }

        document = window.document;

        var img = document.querySelector(selector);

        // get the url of the background image if set
        if (img.currentStyle) {
            var img_url = img.currentStyle['background-image'];
        } else if (window.getComputedStyle) {
            var img_url = document.defaultView.getComputedStyle(img, null).getPropertyValue('background-image');
        } else {
            return default_color;
        }
        img_url = img_url.substr(5, img_url.length - 7);

        // create a dom element for canvas to use to calc avg colour
        img = document.createElement('img');
        img.src = img_url;
        img.id = 'dominantColourImg';
        img.style.display = 'none';

        // work out the background image's avg colour
        var blockSize = 5, // only visit every 5 pixels
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = { r: 0, g: 0, b: 0 },
            count = 0;

        if (!context) {
            return default_color;
        }

        height = canvas.height = img.naturalHeight || img.offsetHeight || img.height;
        width = canvas.width = img.naturalWidth || img.offsetWidth || img.width;

        context.drawImage(img, 0, 0);

        try {
            data = context.getImageData(0, 0, width, height);
        } catch (e) {
            /* security error, img on diff domain */
            return default_color;
        }

        length = data.data.length;

        while ((i += blockSize * 4) < length) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i + 1];
            rgb.b += data.data[i + 2];
        }

        // ~~ used to floor values
        rgb.r = ~~(rgb.r / count);
        rgb.g = ~~(rgb.g / count);
        rgb.b = ~~(rgb.b / count);

        return rgb;
    };
})(window);
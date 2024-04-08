/**
 * @author       Richard Davey <rich@phaser.io>
 * @copyright    2013-2024 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

const CONST = require('../scale/const');

/**
 * Attempts to determine the screen orientation using the Orientation API.
 *
 * @function Phaser.DOM.GetScreenOrientation
 * @since 3.16.0
 *
 * @param {number} width - The width of the viewport.
 * @param {number} height - The height of the viewport.
 *
 * @return {string} The orientation.
 */
const GetScreenOrientation = function (width, height)
{
    const screen = window.screen;
    let orientation = (screen && screen.orientation && screen.orientation.type)
        || screen.mozOrientation
        || screen.msOrientation;

    if (orientation && typeof orientation === 'string')
    {
        //  Screen Orientation API specification
        return orientation;
    }

    if (typeof window.orientation === 'number')
    {
        //  Do this check first, as iOS supports this, but also has an incomplete window.screen implementation
        //  This may change by device based on "natural" orientation.
        return (window.orientation === 0 || window.orientation === 180)
            ? CONST.ORIENTATION.PORTRAIT
            : CONST.ORIENTATION.LANDSCAPE;
    }

    if (window.matchMedia)
    {
        if (window.matchMedia('(orientation: portrait)').matches)
        {
            return CONST.ORIENTATION.PORTRAIT;
        }

        if (window.matchMedia('(orientation: landscape)').matches)
        {
            return CONST.ORIENTATION.LANDSCAPE;
        }
    }

    //  Fallback for when all else fails
    return (height > width)
        ? CONST.ORIENTATION.PORTRAIT
        : CONST.ORIENTATION.LANDSCAPE;
};

module.exports = GetScreenOrientation;

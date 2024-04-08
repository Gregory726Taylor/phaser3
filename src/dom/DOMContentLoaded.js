/**
 * @author       Richard Davey <rich@phaser.io>
 * @copyright    2013-2024 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var OS = require('../device/OS');

/**
 * @callback ContentLoadedCallback
 * @param {...*} args - The arguments to pass to the callback function.
 */

/**
 * Inspects the readyState of the document. If the document is already complete then it invokes the given callback.
 * If not complete it sets up several event listeners such as `deviceready`, and once those fire, it invokes the callback.
 * Called automatically by the Phaser.Game instance. Should not usually be accessed directly.
 *
 * @function Phaser.DOM.DOMContentLoaded
 * @since 3.0.0
 *
 * @param {ContentLoadedCallback} callback - The callback to be invoked when the device is ready and the DOM content is loaded.
 * @throws {TypeError} If the `callback` parameter is not a function.
 */
var DOMContentLoaded = function (callback)
{
    if (typeof callback !== 'function')
    {
        throw new TypeError('The `callback` parameter must be a function.');
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive')
    {
        callback();

        return;
    }

    var check = function ()
    {
        if (document.readyState === 'complete' || document.readyState === 'interactive')
        {
            document.removeEventListener('deviceready', check, true);
            document.removeEventListener('DOMContentLoaded', check, true);


/**
 * @author       Richard Davey <rich@phaser.io>
 * @copyright    2013-2024 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import Clamp from '../../../math/Clamp';
import Class from '../../../utils/Class';
import Events from '../events';
import Vector2 from '../../../math/Vector2';

/**
 * @classdesc
 * A Camera Shake effect.
 *
 * This effect will shake the camera viewport by a random amount, bounded by the specified intensity, each frame.
 *
 * Only the camera viewport is moved. None of the objects it is displaying are impacted, i.e. their positions do
 * not change.
 *
 * The effect will dispatch several events on the Camera itself and you can also specify an `onUpdate` callback,
 * which is invoked each frame for the duration of the effect if required.
 *
 * @class Shake
 * @memberof Phaser.Cameras.Scene2D.Effects
 * @constructor
 * @since 3.5.0
 *
 * @param {Phaser.Cameras.Scene2D.Camera} camera - The camera this effect is acting upon.
 */
class Shake extends Class {

    initialize(camera: Phaser.Cameras.Scene2D.Camera): void {
        /**
         * The Camera this effect belongs to.
         *
         * @name Phaser.Cameras.Scene2D.Effects.Shake#camera
         * @type {Phaser.Cameras.Scene2D.Camera}
         * @readonly
         * @since 3.5.0
         */
        this.camera = camera;

        /**
         * Is this effect actively running?
         *
         * @name Phaser.Cameras.Scene2D.Effects.Shake#isRunning
         * @type {boolean}
         * @readonly
         * @default false
         * @since 3.5.0
         */
        this.isRunning = false;

        /**
         * The duration of the effect, in milliseconds.
         *
         * @name Phaser.Cameras.Scene2D.Effects.Shake#duration
         * @type {number}
         * @readonly
         * @default 0
         * @since 3.5.0
         */
        this.duration = 0;

        /**
         * The intensity of the effect. Use small float values. The default when the effect starts is 0.05.
         * This is a Vector2 object, allowing you to control the shake intensity independently across x and y.
         * You can modify this value while the effect is active to create more varied shake effects.
         *
         * @name Phaser.Cameras.Scene2D.Effects.Shake#intensity
         * @type {Phaser.Math.Vector2}
         * @since 3.5.0
         */
        this.intensity = new Vector2();

        /**
         * If this effect is running this holds the current percentage of the progress, a value between 0 and 1.
         *
         * @name Phaser.Cameras.Scene2D.Effects.Shake#progress
         * @type {number}
         * @since 3.5.0
         */
        this.progress = 0;

        /**
         * Effect elapsed timer.
         *
         * @name Phaser.Cameras.Scene2D.Effects.Shake#_elapsed
         * @type {number}
         * @private
         * @since 3.5.0
         */
        this._elapsed = 0;

        /**
         * How much to offset the camera by horizontally.
         *
         * @name Phaser.Cameras.Scene2D.Effects.Shake#_offsetX
         * @type {number}
         * @private
         * @default 0
         * @since 3.0.0
         */
        this._offsetX = 0;

        /**
         * How much to offset the camera by vertically.
         *
         * @name Phaser.Cameras.Scene2D.Effects.Shake#_offsetY
         * @type {number}
         * @private
         * @default 0
         * @since 3.0.0
         */
        this._offsetY = 0;

        /**
         * This callback is invoked every frame for the duration of the effect.
         *
         * @name Phaser.Cameras.Scene2D.Effects.Shake#_onUpdate
         * @type {?Phaser.Types.Cameras.Scene2D.CameraShakeCallback}
         * @private
         * @default null
         * @since 3.5.0
         */
        this._onUpdate = null;

        /**
         * On Complete callback scope.
         *
         * @name Phaser.Cameras.Scene2D.Effects.Shake#_onUpdateScope
         * @type {any}
         * @private
         * @since 3.5.0
         */
        this._onUpdateScope = null;
    }

    /**
     * @override
     * Shakes the Camera by the given intensity over the duration specified.
     *
     * @method Phaser.Cameras.Scene2D.Effects.Shake#start
     * @fires Phaser.Cameras.Scene2D.Events#SHAKE_START
     * @fires Phaser.Cameras.Scene2D.

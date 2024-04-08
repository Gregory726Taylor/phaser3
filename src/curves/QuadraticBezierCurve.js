/**
 * @author       Richard Davey <rich@phaser.io>
 * @copyright    2013-2024 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import Class from '../utils/Class';
import Curve from './Curve';
import QuadraticBezierInterpolation from '../math/interpolation/QuadraticBezierInterpolation';
import Vector2 from '../math/Vector2';

/**
 * @classdesc
 * A quadratic Bézier curve constructed from two control points.
 *
 * @class QuadraticBezier
 * @extends Phaser.Curves.Curve
 * @memberof Phaser.Curves
 * @constructor
 * @since 3.2.0
 *
 * @param {(Phaser.Math.Vector2|number[])} p0 - Start point, or an array of point pairs.
 * @param {Phaser.Math.Vector2} p1 - Control Point 1.
 * @param {Phaser.Math.Vector2} p2 - Control Point 2.
 */
class QuadraticBezier extends Class({

    Extends: Curve,

    initialize:

    function QuadraticBezier (p0: Vector2 | number[], p1: Vector2, p2: Vector2)
    {
        Curve.call(this, 'QuadraticBezierCurve');

        if (Array.isArray(p0))
        {
            p2 = new Vector2(p0[4], p0[5]);
            p1 = new Vector2(p0[2], p0[3]);
            p0 = new Vector2(p0[0], p0[1]);
        }

        /**
         * @property {Phaser.Math.Vector2} p0 - The start point.
         * @since 3.2.0
         */
        this.p0 = p0;

        /**
         * @property {Phaser.Math.Vector2} p1 - The first control point.
         * @since 3.2.0
         */
        this.p1 = p1;

        /**
         * @property {Phaser.Math.Vector2} p2 - The second control point.
         * @since 3.2.0
         */
        this.p2 = p2;
    },

    /**
     * Gets the starting point on the curve.
     *
     * @method Phaser.Curves.QuadraticBezier#getStartPoint
     * @since 3.2.0
     *
     * @param {Phaser.Math.Vector2} [out] - A Vector2 object to store the result in. If not given will be created.
     *
     * @return {Phaser.Math.Vector2} The coordinates of the point on the curve. If an `out` object was given this will be returned.
     */
    getStartPoint: function (out?: Vector2)
    {
        if (out === undefined) { out = new Vector2(); }

        return out.copy(this.p0);
    },

    /**
     * @deprecated Use `getResolutionAtLength` instead.
     *
     * Get the resolution of the curve.
     *
     * @method Phaser.Curves.QuadraticBezier#getResolution
     * @since 3.2.0
     *
     * @param {number} divisions - Optional divisions value.
     *
     * @return {number} The curve resolution.
     */
    getResolution: function (divisions?: number)
    {
        console.warn('getResolution is deprecated. Use getResolutionAtLength instead.');

        return divisions || 32;
    },

    /**
     * Get the resolution of the curve at a specific length.
     *
     * @method Phaser.Curves.QuadraticBezier#getResolutionAtLength
     * @since 3.2.0
     *
     * @param {number} length - The length of the curve to get the resolution for.
     * @param {number} [divisions=32] - The number of divisions to use when calculating the resolution.
     *
     * @return {number} The curve resolution at the specified length.
     */
    getResolutionAtLength: function (length: number, divisions: number = 32)
    {
        return divisions;
    },

    /**
     * Get point at relative position in curve according to length.
     *
     * @method Phaser.Curves.QuadraticBezier#getPoint
     * @since 3.2.0
     *
     * @param {number} t - The position along the curve to return. Where 0 is the start and 1 is the end.
     * @param {Phaser.Math.Vector2} [out] - A Vector2 object to store the result in. If not given will be created.
     *
     * @return {Phaser.Math.Vector2} The coordinates of the point on the curve. If an `out` object was given this will be returned.
     */
    getPoint: function (t: number, out?: Vector2)
    {
        if (out === undefined) { out = new Vector2(); }

        const p0 = this.p0;
        const p1 = this.p1;
        const p2 = this.p2;

        return out.set(
            QuadraticBezierInterpolation(t, p0.x, p1.x, p2

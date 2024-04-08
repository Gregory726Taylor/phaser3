/**
 * @author       Richard Davey <rich@phaser.io>
 * @copyright    2013-2024 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

//  Based on the three.js Curve classes created by [zz85](http://www.lab4games.net/zz85/blog)

const Class = require('../../utils/Class');
const CubicBezierCurve = require('../CubicBezierCurve');
const EllipseCurve = require('../EllipseCurve');
const GameObjectFactory = require('../../gameobjects/GameObjectFactory');
const LineCurve = require('../LineCurve');
const MovePathTo = require('./MoveTo');
const QuadraticBezierCurve = require('../QuadraticBezierCurve');
const Rectangle = require('../../geom/rectangle/Rectangle');
const SplineCurve = require('../SplineCurve');
const Vector2 = require('../../math/Vector2');
const MATH_CONST = require('../../math/const');

/**
 * @classdesc
 * A Path combines multiple Curves into one continuous compound curve.
 * It does not matter how many Curves are in the Path or what type they are.
 *
 * A Curve in a Path does not have to start where the previous Curve ends - that is to say, a Path does not
 * have to be an uninterrupted curve. Only the order of the Curves influences the actual points on the Path.
 *
 * @class Path
 * @memberof Phaser.Curves
 * @constructor
 * @since 3.0.0
 *

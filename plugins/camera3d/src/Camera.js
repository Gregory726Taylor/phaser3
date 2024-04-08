/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

const Class = require('../../../src/utils/Class').default;
const Matrix4 = require('../../../src/math/Matrix4').default;
const RandomXYZ = require('../../../src/math/RandomXYZ').default;
const RandomXYZW = require('../../../src/math/RandomXYZW').default;
const RotateVec3 = require('../../../src/math/RotateVec3').default;
const Set = require('../../../src/structs/Set').default;
const Sprite3D = require('./sprite3d/Sprite3D').default;
const Vector2 = require('../../../src/math/Vector2').default;
const Vector3 = require('../../../src/math/Vector3').default;
const Vector4 = require('../../../src/math/Vector4').default;

//  Local cache vars

//  @author attribute https://github.com/mattdesl/cam3d/wiki

/**
 * @typedef {object} RayDef
 *
 * @property {Phaser.Math.Vector3} origin - [description]
 * @property {Phaser.Math.Vector3} direction - [description]
 */

/**
 * @classdesc
 * [description]
 *
 * @class Camera
 * @memberOf Phaser.Cameras.Sprite3D
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Scene} scene - [description]
 */
class Camera extends Class {

    constructor(scene) {
        /**
         * [description]
         *
         * @name Phaser.Cameras.Sprite3D#scene
         * @type {Phaser.Scene}
         * @since 3.0.0
         */
        this.scene = scene;

        /**
         * [description]
         *
         * @name Phaser.Cameras.Sprite3D#displayList
         * @type {Phaser.GameObjects.DisplayList}
         * @since 3.0.0
         */
        this.displayList = scene.sys.displayList;

        /**
         * [description]
        

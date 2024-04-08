/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var Class = require('../../../src/utils/Class');
var Vector3 = this.scene.game.math.Vector3;

/**
 * @classdesc
 * [description]
 *
 * @class PerspectiveCamera
 * @extends Phaser.Cameras.Sprite3D.Camera
 * @memberOf Phaser.Cameras.Sprite3D
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Scene} scene - [description]
 * @param {integer} [fieldOfView=80] - [description]
 * @param {integer} [viewportWidth=0] - [description]
 * @param {integer} [viewportHeight=0] - [description]
 */
var PerspectiveCamera = new Class({

    Extends: Camera,

    initialize: function PerspectiveCamera (scene, fieldOfView, viewportWidth, viewportHeight)
    {
        Camera.call(this, scene);

        this.viewportWidth = viewportWidth;
        this.viewportHeight = viewportHeight;

        this.fieldOfView = fieldOfView * Math.PI / 180;

        this.update();
    },

    /**
     * [description]
     *
     * @method Phaser.Cameras.Sprite3D.PerspectiveCamera#setFOV
     * @since 3.0.0
     *
     * @param {number} value - [description]
     *
     * @return {PerspectiveCamera} [description]
     */
    setFOV: function (value)
    {
        if (typeof value !== 'number') {
            console.warn('PerspectiveCamera: Invalid value for field of view');
            return this;
        }

        this.fieldOfView = value * Math.PI / 180;

        this.update();

        return this;
    },

    /**
     * [description]
     *
     * @method Phaser.Cameras.Sprite3D.PerspectiveCamera#update
     * @since 3.0.0
     *
     * @return {PerspectiveCamera} [description]
     */
    update: function ()
    {
        if (!this.scene || !this.viewportWidth || !this.viewportHeight || !this.near) {
            return this;
        }

        var aspect = this.viewportWidth / this.viewportHeight;

        this.setProjection(
            this.fieldOfView,
            aspect,
            Math.abs(this.near),
            Math.abs(this.far)
        );

        var position = this.position;
        var direction = this.direction;
        var up = this.up;

        this.setView(position, direction, up);

        this.setCombined(this.projection, this.view);

        this.setInvProjectionView(this.combined);

        this.billboardMatrixDirty = true;

        this.updateChildren();

        return this;
    }

});

Object.defineProperties(PerspectiveCamera.prototype, {
    projection: {
        get: function () {
            return this._projection;
        },
        set: function (value) {
            this._projection = value;
        }
    },
    view: {
        get: function () {
            return this._view;
        },
        set: function (value) {
            this._view = value;
        }
    },
    combined: {
        get: function () {
            return this._combined;
        },
        set: function (value) {
            this._combined = value;
        }
    },
    invProjectionView: {
        get: function () {
            return this._invProjectionView;
        },
        set: function (value) {
            this._invProjectionView = value;
        }
    }
});

module.exports = PerspectiveCamera;

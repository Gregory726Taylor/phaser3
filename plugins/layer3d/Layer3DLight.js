/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Class = require('../../utils/Class');
var RGB = require('../../display/RGB');
var Vector3 = require('../../math/Vector3');

/**
 * @classdesc
 * A 3D Layer Light.
 *
 * @class Layer3DLight
 * @memberof Phaser.GameObjects
 * @constructor
 * @since 3.50.0
 */
class Layer3DLight extends Class {

    initialize(layer, x, y, z) {
        /**
         * The Layer3D instance this light belongs to.
         *
         * @name Phaser.GameObjects.Layer3DLight#layer
         * @type {Phaser.GameObjects.Layer3D}
         * @since 3.50.0
         */
        this.layer = layer;

        /**
         * The position of the light in 3D space.
         *
         * @name Phaser.GameObjects.Layer3DLight#position
         * @type {Phaser.Math.Vector3}
         * @since 3.50.0
         */
        this.position = new Vector3(x, y, z);

        /**
         * The ambient color of the light.
         *
         * The default ambient color is 1, 1, 1.
         *
         * @name Phaser.GameObjects.Layer3DLight#ambient
         * @type {Phaser.Display.RGB}
         * @since 3.50.0
         */
        this.ambient = new RGB(1, 1, 1);

        /**
         * The diffuse color of the light.
         *
         * The default diffuse color is 1, 1, 1.
         *
         * @name Phaser.GameObjects.Layer3DLight#diffuse
         * @type {Phaser.Display.RGB}
         * @since 3.50.0
         */
        this.diffuse = new RGB(1, 1, 1);

        /**
         * The specular color of the light.
         *
         * The default specular color is 1, 1, 1.
         *
         * @name Phaser.GameObjects.Layer3DLight#specular
         * @type {Phaser.Display.RGB}
         * @since 3.50.0
         */
        this.specular = new RGB(1, 1, 1);

        /**
         * Internal dirty cache array.
         *
         * @name Phaser.GameObjects.Layer3DLight#dirtyCache
         * @type {number[]}
         * @private
         * @since 3.50.0
         */
        this.dirtyCache = [0, 0, 0];
    }

    /**
     * Checks if the position of this light is dirty.
     *
     * @method Phaser.GameObjects.Layer3DLight#isDirty
     * @since 3.50.0
     *
     * @return {boolean} `true` if this light is dirty, otherwise `false`.
     */
    isDirty() {
        const position = this.position;
        const dirtyCache = this.dirtyCache;

        const x = position.x;
        const y = position.y;
        const z = position.z;

        dirtyCache[0] = x;
        dirtyCache[1] = y;
        dirtyCache[2] = z;

        return (dirtyCache[0] !== x || dirtyCache[1] !== y || dirtyCache[2] !== z);
    }

    /**
     * Sets the position of this light.
     *
     * @method Phaser.GameObjects.Layer3DLight#setPosition
     * @since 3.50.0
     *
     * @param {number} x - The x position of this light.
     * @param {number} y - The y position of this light.
     * @param {number} z - The z position of this light.
     *
     * @return {this} This Layer3DLight instance.
     */
    setPosition(x, y, z) {
        this.position.set(x, y, z);

        return this;
    }

    /**
     * Sets the ambient color of this light.
     *
     * @method Phaser.GameObjects.Layer3DLight#setAmbient
     * @since 3.50.0
     *
     * @param {number} r - The red color value. Between 0 and 1.
     * @param {number} g - The green color value. Between 0 and 1.
     * @param {number} b - The blue color value. Between 0 and 1.
     *
     * @return {this} This Layer3DLight instance.
     */
    setAmbient(r, g, b) {
        this.ambient.set(r, g, b);

        return this;
    }

    /**
     * Sets the diffuse color of this light.
     *
     * @method Phaser.GameObjects.Layer3DLight#setDiffuse
     * @since 3.50.0
     *
     * @param {number} r - The red color value. Between 0 and 1.
     * @param {number} g - The green color value.

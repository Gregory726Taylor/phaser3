/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import TYPE from '../TYPE';

/**
 * The Impact Check Against component.
 * Should be applied as a mixin.
 *
 * @namespace Phaser.Physics.Impact.Components.CheckAgainst
 * @since 3.0.0
 */
const CheckAgainst = {

    /**
     * [description]
     *
     * @method Phaser.Physics.Impact.Components.CheckAgainst#setAvsB
     * @since 3.0.0
     *
     * @return {Phaser.GameObjects.GameObject} This Game Object.
     */
    setAvsB() {
        this.setTypeA();
        this._setCheckAgainst(TYPE.B);
        this.body.updateType();
        return this;
    },

    /**
     * [description]
     *
     * @method Phaser.Physics.Impact.Components.CheckAgainst#setBvsA
     * @since 3.0.0
     *
     * @return {Phaser.GameObjects.GameObject} This Game Object.
     */
    setBvsA() {
        this.setTypeB();
        this._setCheckAgainst(TYPE.A);
        this.body.updateType();
        return this;
    },

    /**
     * [description]
     *
     * @method Phaser.Physics.Impact.Components.CheckAgainst#setCheckAgainstNone
     * @since 3.0.0
     *
     * @return {Phaser.GameObjects.GameObject} This Game Object.
     */
    setCheckAgainstNone() {
        this._setCheckAgainst(TYPE.NONE);
        return this;
    },

    /**
     * [description]
     *
     * @method Phaser.Physics.Impact.Components.CheckAgainst#setCheckAgainstA
     * @since 3.0.0
     *
     * @return {Phaser.GameObjects.GameObject} This Game Object.
     */
    setCheckAgainstA() {
        this.preferTypeA();
        return this;
    },

    /**
     * [description]
     *
     * @method Phaser.Physics.Impact.Components.CheckAgainst#setCheckAgainstB
     * @since 3.0.0
     *
     * @return {Phaser.GameObjects.GameObject} This Game Object.
     */
    setCheckAgainstB() {
        this.preferTypeB();
        return this;
    },

    /**
     * [description]
     *
     * @name Phaser.Physics.Impact.Components.CheckAgainst#checkAgainst
     * @type {number}
     * @since 3.0.0
     */
    checkAgainst: {

        get() {
            return this.body.checkAgainst;
        },

        set(value: number) {
            this._setCheckAgainst(value);
        }

   

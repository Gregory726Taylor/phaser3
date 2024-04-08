/**
 * The Animation Stop Event.
 * This event is dispatched by a Sprite when an animation is stopped on it.
 *
 * @event Phaser.Animations.Events#ANIMATION_STOP
 * @type {string}
 * @since 3.50.0
 *
 * @param {Phaser.Animations.Animation} animation - A reference to the Animation that has stopped.
 * @param {Phaser.Animations.AnimationFrame} frame - The current Animation Frame of the Animation.
 * @param {Phaser.GameObjects.Sprite} gameObject - A reference to the Game Object on which the animation stopped.
 * @param {string} frameKey - The unique key of the Animation Frame within the Animation.
 */

module.exports = 'animationstop';


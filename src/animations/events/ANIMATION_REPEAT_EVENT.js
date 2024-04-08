/**
 * The Animation Repeat Event.
 * This event is dispatched by a Sprite when an animation repeats playing on it.
 *
 * @event Phaser.Animations.Events#ANIMATION_REPEAT
 * @type {string}
 * @since 3.50.0
 *
 * @param {Phaser.Animations.Animation} animation - A reference to the Animation that has repeated.
 * @param {Phaser.Animations.AnimationFrame} frame - The current Animation Frame of the Animation.
 * @param {Phaser.GameObjects.Sprite} gameObject - A reference to the Game Object on which the animation repeated.
 * @param {string} frameKey - The unique key of the Animation Frame within the Animation.
 */

// Export the event name as a string
module.exports = 'animationrepeat';

/**
 * Options for configuring a Phaser Particle Emitter.
 */
export interface PhaserParticleEmitterConfigOptions {
  /**
   * The accelerationX operator instance. This is an onEmit and onUpdate operator.
   */
  accelerationX: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The accelerationY operator instance. This is an onEmit and onUpdate operator.
   */
  accelerationY: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The alpha operator instance. This is an onEmit and onUpdate operator.
   */
  alpha: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The angle operator instance. This is an onEmit operator only.
   */
  angle: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The bounce operator instance. This is an onEmit and onUpdate operator.
   */
  bounce: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The color operator instance. This is an onEmit and onUpdate operator.
   */
  color: Phaser.GameObjects.Particles.EmitterColorOp;

  /**
   * The delay operator instance. This is an onEmit operator only.
   */
  delay: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The hold operator instance. This is an onEmit operator only.
   */
  hold: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The lifespan operator instance. This is an onEmit operator only.
   */
  lifespan: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The maxVelocityX operator instance. This is an onEmit and onUpdate operator.
   */
  maxVelocityX: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The maxVelocityY operator instance. This is an onEmit and onUpdate operator.
   */
  maxVelocityY: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The moveToX operator instance. This is an onEmit and onUpdate operator.
   */
  moveToX: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The moveToY operator instance. This is an onEmit and onUpdate operator.
   */
  moveToY: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The quantity operator instance. This is an onEmit operator only.
   */
  quantity: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The rotate operator instance. This is an onEmit and onUpdate operator.
   */
  rotate: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The scaleX operator instance. This is an onEmit and onUpdate operator.
   */
  scaleX: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The scaleY operator instance. This is an onEmit and onUpdate operator.
   */
  scaleY: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The speedX operator instance. This is an onEmit operator only.
   */
  speedX: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The speedY operator instance. This is an onEmit operator only.
   */
  speedY: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The tint operator instance. This is an onEmit and onUpdate operator.
   */
  tint: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The x operator instance. This is an onEmit and onUpdate operator.
   */
  x: Phaser.GameObjects.Particles.EmitterOp;

  /**
   * The y operator instance. This is an onEmit and onUpdate operator.
   */
  y: Phaser.GameObjects.Particles.EmitterOp;
}

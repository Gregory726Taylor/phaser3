/**
 * Returns the unrotated bounds of the Game Object as a rectangle.
 *
 * @function getBounds
 * @since 3.24.0
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The Game Object to get the bounds value from.
 * @param {Phaser.Geom.Rectangle|object} [output] - An object to store the values in. If not provided a new Rectangle will be created.
 *
 * @return {Phaser.Geom.Rectangle|object} - The bounds of the Game Object.
 */
import { Rectangle } from '../../geom/rectangle/Rectangle';
import { GetBottom } from './GetBottom';
import { GetLeft } from './GetLeft';
import { GetRight } from './GetRight';
import { GetTop } from './GetTop';

const getBounds = (gameObject: Phaser.GameObjects.GameObject, output?: Phaser.Geom.Rectangle | object): Phaser.Geom.Rectangle | object => {
  if (output === undefined) { output = new Rectangle(); }

  const left = GetLeft(gameObject);
  const top = GetTop(gameObject);

  output.x = left;
  output.y = top;
  output.width = GetRight(gameObject) - left;
  output.height = GetBottom(gameObject) - top;

  return output;
};

export default getBounds;

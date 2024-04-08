/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2023 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

const { BuildGameObject } = require('../BuildGameObject');
const { GameObjectCreator } = require('../GameObjectCreator');
const { Layer3D } = require('./Layer3D');

/**
 * Creates a new Layer3D Game Object and returns it.
 *
 * Note: This method will only be available if the Layer3D Game Object and WebGL support have been built into Phaser.
 *
 * @method Phaser.GameObjects.GameObjectCreator#layer3d
 * @since 3.50.0
 * @param {Phaser.Types.GameObjects.GameObjectConfig} config - The configuration object this Game Object will use to create itself.
 * @param {boolean} [addToScene=config.add] - Add this Game Object to the Scene after creating it? If set this argument overrides the `add` property in the config object.
 * @return {Phaser.GameObjects.Layer3D} The Game Object that was created.
 */
GameObjectCreator.register('layer3d', (config, addToScene = config.add) => {
  config.add = addToScene;
  const layer = new Layer3D(this.scene, 0, 0, config);
  BuildGameObject(this.scene, layer, config);
  return layer;
});

//  When registering a factory function 'this' refers to the GameObjectCreator context.


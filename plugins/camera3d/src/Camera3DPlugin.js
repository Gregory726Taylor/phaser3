/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

const BuildGameObject = require('../../../src/gameobjects/BuildGameObject');
const BuildGameObjectAnimation = require('../../../src/gameobjects/BuildGameObjectAnimation');
const Class = require('../../../src/utils/Class');
const GetAdvancedValue = require('../../../src/utils/object/GetAdvancedValue');
const OrthographicCamera = require('./OrthographicCamera');
const PerspectiveCamera = require('./PerspectiveCamera');
const ScenePlugin = require('../../../src/plugins/ScenePlugin');
const Sprite3D = require('./sprite3d/Sprite3D');

/**
 * @classdesc
 * The Camera 3D Plugin adds a new Camera type to Phaser that allows for movement and rendering
 * in 3D space. It displays a special type of Sprite called a Sprite3D that is a billboard sprite,
 * with a z-axis allowing for perspective depth.
 *
 * This is an external plugin which you can include in your game by preloading it:
 *
 * ```javascript
 * this.load.scenePlugin({
 *   key: 'Camera3DPlugin',
 *   url: 'plugins/camera3d.min.js',
 *   sceneKey: 'cameras3d'
 * });
 * ```
 *
 * Once loaded you can create a 3D Camera using the `camera3d` property of a Scene:
 *
 * `var camera = this.cameras3d.add(85).setZ(500).setPixelScale(128);`
 *
 * See the examples for more information.
 *
 * @class Camera3DPlugin
 * @constructor
 *
 * @param {Phaser.Scene} scene - The Scene to which this plugin is being installed.
 * @param {Phaser.Plugins.PluginManager} pluginManager - A reference to the Phaser Plugin Manager.
 */
class Camera3DPlugin extends ScenePlugin {

    constructor(scene, pluginManager) {
        super.initialize(scene, pluginManager);

        /**
         * An Array of the Camera objects being managed by this Camera Manager.
         *
         * @name Camera3DPlugin#cameras
         * @type {Phaser.Cameras.Sprite3D.Camera[]}
         * @since 3.0.0
         */
        this.cameras = [];

        //  Register the Sprite3D Game Object
        pluginManager.registerGameObject('sprite3D', this.sprite3DFactory, this.sprite3DCreator);
    }

    /**
     * Creates a new Sprite3D Game Object and adds it to the Scene.
     *
     * @method Phaser.GameObjects.GameObjectFactory#sprite3D
     * @since 3.0.0
     *
     * @param {number} x - The horizontal position of this Game Object.
    

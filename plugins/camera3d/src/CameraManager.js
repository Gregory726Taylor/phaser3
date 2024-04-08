/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

const Class = require('../../../src/utils/Class');
const OrthographicCamera = require('./OrthographicCamera');
const PerspectiveCamera = require('./PerspectiveCamera');
const PluginCache = require('../../../src/plugins/PluginCache');

/**
 * @classdesc
 * Camera Manager for 3D Sprite Cameras
 *
 * @class CameraManager
 * @memberOf Phaser.Cameras.Sprite3D
 * @extends Phaser.Class
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Scene} scene - The Scene to which this Camera Manager belongs.
 */
class CameraManager extends Class {

    constructor(scene) {
        super();

        /**
         * The Scene to which this Camera Manager belongs.
         *
         * @name Phaser.Cameras.Sprite3D.CameraManager#scene
         * @type {Phaser.Scene}
         * @since 3.0.0
         */
        this.scene = scene;

        /**
         * The Systems associated with this Camera Manager's Scene.
         *
         * @name Phaser.Cameras.Sprite3D.CameraManager#systems
         * @type {Phaser.Scenes.Systems}
         * @since 3.0.0
         */
        this.systems = scene.sys;

        /**
         * An Array of the Camera objects being managed by this Camera Manager.
         *
         * @name Phaser.Cameras.Sprite3D.CameraManager#cameras
         * @type {Phaser.Cameras.Sprite3D.Camera[]}
         * @since 3.0.0
         */
        this.cameras = [];

        /**
         * The currently active Camera.
         *
         * @name Phaser.Cameras.Sprite3D.CameraManager#activeCamera
         * @type {(Phaser.Cameras.Sprite3D.OrthographicCamera|Phaser.Cameras.Sprite3D.PerspectiveCamera)}
         * @since 3.0.0
         */
        this.activeCamera = null;

        this.systems.events.once('boot', this.boot, this);
        this.systems.events.on('start', this.start, this);
    }

    /**
     * This method is called automatically, only once, when the Scene is first created.
     * Do not invoke it directly.
     *
     * @method Phaser.Cameras.Scene3D.CameraManager#boot
     * @private
     * @since 3.5.1
     */
    boot() {
        this.systems.events.once('destroy', this.destroy, this);
    }

    /**
     * This method is called automatically by the Scene when it is starting up.
     * It is responsible for creating local systems, properties and listening for Scene events.
     * Do not invoke it directly.
     *
     * @method Phaser.Cameras.Sprite3D.CameraManager#start
     * @private
     * @since 3.5.0
     */
    start() {
        const eventEmitter = this.systems.events;

        eventEmitter.on('update', this.update, this);
        eventEmitter.once('shutdown', this.shutdown, this);
    }

    /**
     * Add a new Camera to this Camera Manager.
     *
     * @method Phaser.Cameras.Sprite3D.CameraManager#add
     * @since 3.0.0
     *
     * @param {number} [fieldOfView=80] - The Field of View for a Perspective Camera.
     * @param {number} [width] - The width of the Camera.
     * @param {number} [height] - The height of the Camera.
     *
     * @return {(Phaser.Cameras.Sprite3D.OrthographicCamera|Phaser.Cameras.Sprite3D.PerspectiveCamera)} The last added Camera.
     */
    add(fieldOfView, width, height) {
        if (fieldOfView !== undefined && width === undefined && height === undefined) {
            return this.addPerspectiveCamera(fieldOfView);
        }

        return this.addOrthographicCamera(width, height);
    }

    /**
     * Add a new Orthographic Camera to this Camera Manager.
     *
     * @method Phaser.Cameras.Sprite3D.CameraManager#addOrthographicCamera
     * @since 3.0.0
     *
     * @param {number} [width] - The width of the Camera.
     * @param {number} [height] - The height of the Camera.
     *
     * @return {Phaser.Cameras.Sprite3D.OrthographicCamera} The last added Orthographic Camera.
     */
    addOrthographicCamera(width, height) {
        const config = this.scene.sys.game.config;

        if (width === undefined) { width = config.width; }
        if (height === undefined) { height = config.height; }

        const camera = new OrthographicCamera(this.scene, width, height);

        this.cameras.push(camera);

        if (this.activeCamera === null) {
            this.setActiveCamera(camera);
        }

        return camera;
    }

    /**
     * Add a new Perspective Camera to this Camera Manager.
     *
     *

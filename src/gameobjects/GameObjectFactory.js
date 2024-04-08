/**
 * @author       Richard Davey <rich@phaser.io>
 * @copyright    2013-2024 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

const Class = require('../utils/Class');
const PluginCache = require('../plugins/PluginCache');
const SceneEvents = require('../scene/events');

/**
 * @classdesc
 * The Game Object Factory is a Scene plugin that allows you to quickly create many common
 * types of Game Objects and have them automatically registered with the Scene.
 *
 * Game Objects directly register themselves with the Factory and inject their own creation
 * methods into the class.
 *
 * @class GameObjectFactory
 * @memberof Phaser.GameObjects
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Scene} scene - The Scene to which this Game Object Factory belongs.
 */
class GameObjectFactory extends Class {

    initialize(scene) {
        /**
         * The Scene to which this Game Object Factory belongs.
         * @type {Phaser.Scene}
         * @protected
         */
        this.scene = scene;

        /**
         * A reference to the Scene.Systems.
         * @type {Phaser.Scenes.Systems}
         * @protected
         */
        this.systems = scene.sys;

        /**
         * A reference to the Scene Event Emitter.
         * @type {Phaser.Events.EventEmitter}
         * @protected
         */
        this.events = scene.sys.events;

        /**
         * A reference to the Scene Display List.
         * @type {Phaser.GameObjects.DisplayList}
         * @protected
         */
        this.displayList;

        /**
         * A reference to the Scene Update List.
         * @type {Phaser.GameObjects.UpdateList}
         * @protected
         */
        this.updateList;

        this.events.once(SceneEvents.BOOT, this.boot, this);
        this.events.on(SceneEvents.START, this.start, this);
    }

    /**
     * This method is called automatically, only once, when the Scene is first created.
     * Do not invoke it directly.
     *
     * @private
     * @since 3.5.1
     */
    boot() {
        this.displayList = this.systems.displayList;
        this.updateList = this.systems.updateList;

        this.events.once(SceneEvents.DESTROY, this.destroy, this);
    }

    /**
     * This method is called automatically by the Scene when it is starting up.
     * It is responsible for creating local systems, properties and listening for Scene events.
     * Do not invoke it directly.
     *
     * @private
     * @since 3.5.0
     */
    start() {
        this.events.once(SceneEvents.SHUTDOWN, this.shutdown, this);
    }

    /**
     * Adds an existing Game Object to this Scene.
     *
     * If the Game Object renders, it will be added to the Display List.
     * If it has a `preUpdate` method, it will be added to the Update List.
     *
     * @method existing
     * @since 3.0.0
     *
     * @param {(Phaser.GameObjects.GameObject|Phaser.GameObjects.Group|Phaser.GameObjects.Layer)} child - The child to be added to this Scene.
     *
     * @returns {Phaser.GameObjects.GameObject} The Game Object that was added.
     */
    existing(child) {
        if (child.renderCanvas || child.renderWebGL) {
            this.displayList.add(child);
        }

        //  For when custom objects have overridden `preUpdate` but don't hook into the ADDED_TO_SCENE event:
        //  Adding to the list multiple times is safe, as it won't add duplicates into the list anyway.
        if (child.preUpdate) {
            this.updateList.add(child);
        }

        return child;
    }

    /**
     * The Scene that owns this plugin is shutting down.
     * We need to kill and reset all internal properties as well as stop listening to Scene events.
     *
     * @private
     * @since 3.0.0
     */
    shutdown() {
        this.events.off(SceneEvents.SHUTDOWN, this.shutdown, this);
    }

    /**
     * The Scene that owns this plugin is being destroyed.
     * We need to shutdown and then kill off all external references.
     *
     * @private
     * @since 3.0.0
     */
    destroy() {
        this.shutdown();

        this.events.off(SceneEvents.START, this.start, this);

        this.scene = null;
        this.systems = null;
        this.events = null;

        this.displayList = null;
        this.updateList = null;
    }

}

/**
 * Static method called directly by the Game Object factory functions.
 * With this method you can register a custom GameObject factory in the GameObjectFactory,
 * providing a name (`factoryType`) and the constructor (`factoryFunction`) in order
 * to be called when you call to Phaser.Scene.add[ factoryType ] method.
 *
 * @method register
 * @static
 * @since 3.0.0
 *
 * @param {string} factoryType - The key of the factory that you will use to call to Phaser.Scene.add[ factoryType

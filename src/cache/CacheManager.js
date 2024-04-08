/**
 * The Cache Manager is the global cache owned and maintained by the Game instance.
 *
 * @class CacheManager
 * @memberof Phaser.Cache
 * @extends Phaser.GameObjects.GameObject
 * @since 3.0.0
 */
class CacheManager extends Phaser.GameObjects.GameObject {
  /**
   * CacheManager constructor.
   *
   * @param {Phaser.Game} game - A reference to the Phaser.Game instance that owns this CacheManager.
   */
  constructor(game) {
    super(game, 0, 0);

    /**
     * A reference to the Phaser.Game instance that owns this CacheManager.
     *
     * @name Phaser.Cache.CacheManager#game
     * @type {Phaser.Game}
     * @protected
     * @since 3.0.0
     */
    this.game = game;

    /**
     * @type {Array<{key: string, cache: Phaser.Cache.BaseCache}>}
     * @private
     * @since 3.0.0
     */
    this._defaultCaches = [
      { key: 'binary', cache: new BaseCache() },
      { key: 'bitmapFont', cache: new BaseCache() },
      { key: 'json', cache: new BaseCache() },
      { key: 'physics', cache: new BaseCache() },
      { key: 'shader', cache: new BaseCache() },
      { key: 'audio', cache: new BaseCache() },
      { key: 'video', cache: new BaseCache() },
      { key: 'text', cache: new BaseCache() },
      { key: 'html', cache: new BaseCache() },
      { key: 'obj', cache: new BaseCache() },
      { key: 'tilemap', cache: new BaseCache() },
      { key: 'xml', cache: new BaseCache() },
    ];

    /**
     * @type {WeakMap<string, Phaser.Cache.BaseCache>}
     * @private
     * @since 3.0.0
     */
    this._customCaches = new WeakMap();

    this.game.add.existing(this);
  }

  /**
   * Add your own custom Cache for storing your own files.
   * The cache will be available under `Cache.custom.key`.
   * The cache will only be created if the key is not already in use.
   *
   * @method Phaser.Cache.CacheManager#addCustom
   * @since 3.0.0
   *
   * @param {string} key - The unique key of your custom cache.
   *
   * @return {Phaser.Cache.BaseCache} A reference to the BaseCache that was created. If the key was already in use, a reference to the existing cache is returned instead.
   */
  addCustom(key) {
    if (!this._customCaches.has(key)) {
      this._customCaches.set(key, new BaseCache());
    }

    return this._customCaches.get(key);
  }

  /**
   * Removes all entries from all BaseCaches and destroys all custom caches.
   *
   * @method Phaser.Cache.CacheManager#destroy
   * @since 3.0.0
   */
  destroy() {
    for (const cacheData of this._defaultCaches) {
      cacheData.cache.destroy();
    }

    for (const customCache of this._customCaches.values()) {
      customCache.destroy();
    }

    this._defaultCaches.length = 0;
    this._customCaches.clear();

    super.destroy();
  }
}

module.exports = CacheManager;

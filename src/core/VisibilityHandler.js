/**
 * @author       Richard Davey <rich@phaser.io>
 * @copyright    2013-2024 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

const Events = require('./events');

/**
 * The Visibility Handler is responsible for listening out for document level visibility change events.
 * This includes `visibilitychange` if the browser supports it, and blur and focus events. It then uses
 * the provided Event Emitter and fires the related events.
 *
 * @function Phaser.Core.VisibilityHandler
 * @fires Phaser.Core.Events#BLUR
 * @fires Phaser.Core.Events#FOCUS
 * @fires Phaser.Core.Events#HIDDEN
 * @fires Phaser.Core.Events#VISIBLE
 * @since 3.0.0
 *
 * @param {Phaser.Game} game - The Game instance this Visibility Handler is working on.
 */
class VisibilityHandler {
  constructor(game) {
    this.hiddenVar;
    this.eventEmitter = game.events;

    if (document.hidden !== undefined) {
      this.hiddenVar = 'visibilitychange';
    } else {
      const vendors = ['webkit', 'moz', 'ms'];

      for (const prefix of vendors) {
        if (document[prefix + 'Hidden'] !== undefined) {
          document.hidden = function () {
            return document[prefix + 'Hidden'];
          };

          this.hiddenVar = prefix + 'visibilitychange';
          break;
        }
      }
    }

    const onChange = (event) => {
      if (document.hidden || event.type === 'pause') {
        this.eventEmitter.emit(Events.HIDDEN);
      } else {
        this.eventEmitter.emit(Events.VISIBLE);
      }
    };

    if (this.hiddenVar) {
      document.addEventListener(this.hiddenVar, onChange, { passive: true, capture: false });
    }

    window.onblur = () => {
      this.eventEmitter.emit(Events.BLUR);
    };

    window.onfocus = () => {
      this.eventEmitter.emit(Events.FOCUS);
    };

    //  Automatically give the window focus unless config says otherwise
    if (window.focus && game.config.autoFocus) {
      window.focus();
    }
  }

  dispose() {
    if (this.hiddenVar) {
      document.removeEventListener(this.hiddenVar, onChange);
    }

    window.onblur = null;
    window.onfocus = null;
  }
}

module.exports = VisibilityHandler;


/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

const Class = require('../../../src/utils/Class');
const EventEmitter = require('eventemitter3');
const LeaderboardScore = require('./LeaderboardScore');

class Leaderboard extends EventEmitter {

    constructor(plugin, data) {
        super();

        this.plugin = plugin;
        this.ref = data;
        this.name = data.getName();
        this.contextID = data.getContextID();
        this.entryCount = 0;
        this.playerScore = null;
        this.scores = [];

        this.getEntryCount();
    }

    getEntryCount() {
        const _this = this;

        this.ref.getEntryCountAsync()
            .then(count => {
                _this.entryCount = count;
                _this.emit('getentrycount', count, _this.name);
            })
            .catch(e => console.warn(e));

        return this;
    }

    setScore(score, data) {
        if (data === undefined) { data = ''; }

        if (typeof data === 'object') {
            data = JSON.stringify(data);
        }

        const _this = this;

        this.ref.setScoreAsync(score, data)
            .then(entry => {
                if (entry) {
                    const score = LeaderboardScore(entry);
                    _this.playerScore = score;
                    _this.emit('setscore', score, _this.name);
                } else {
                    _this.emit('setscore', null, _this.name);
                }
            })
            .catch(e => console.warn(e));

        return this;
    }

    getPlayerScore() {
        const _this = this;

        this.ref.getPlayerEntryAsync()
            .then(entry => {
                if (entry) {
                    const score = LeaderboardScore(entry);
                    _this.playerScore = score;
                    _this.emit('getplayerscore', score, _this.name);
                } else {
                    _this.emit('getplayerscore', null, _this.name);
                }
            })
            .catch(e => console.warn(e));

        return this;
    }

    getScores(count = 10, offset = 0) {
        const _this = this;

        this.ref.getEntriesAsync(count, offset)
            .then(entries => {
                _this.scores = [];

                entries.forEach(entry => {
                    _this.scores.push(LeaderboardScore(entry));
                });

                _this.emit('getscores', _this.scores, _this.name);
            })
            .catch(e => console.warn(e));

        return this;
    }

    getConnectedScores() {
        const _this = this;

        this.ref.getConnectedPlayerEntriesAsync()
            .then(entries => {
                _this.scores = [];

                entries.forEach(entry => {
                    _this.scores.push(LeaderboardScore(entry));
                });

                _this.emit('getconnectedscores', _this.scores, _this.name);
            })
            .catch(e => console.warn(e));

        return this;
    }

}

module.exports = Leaderboard;

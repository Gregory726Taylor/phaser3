/**
 * Generates a lookup object for slope definitions based on tile IDs.
 * Each slope definition consists of line data and a solid/non-solid flag.
 *
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

// Constants
const HEIGHT_HALF = 0.5;
const NEAR_THIRD = 1 / 3;
const MID_THIRD = 2 / 3;

// Tile ID to Slope defs.
// First 4 elements = line data, final = solid or non-solid behind the line
const slopeDefinitions = {
  2: [`0, ${HEIGHT_HALF}, ${HEIGHT_HALF}, 0`, true],
  3: [`0, ${HEIGHT_HALF}, ${HEIGHT_HALF}, ${NEAR_THIRD}`, true],
  4: [`0, ${NEAR_THIRD}, ${HEIGHT_HALF}, 0`, true],
  5: [`0, ${HEIGHT_HALF}, ${HEIGHT_HALF}, ${MID_THIRD}`, true],
  6: [`0, ${MID_THIRD}, ${HEIGHT_HALF}, ${NEAR_THIRD}`, true],
  7: [`0, ${NEAR_THIRD}, ${HEIGHT_HALF}, 0`, true],
  8: [`${HEIGHT_HALF}, ${HEIGHT_HALF}, 0, 0`, true],
  9: [`1, 0, ${HEIGHT_HALF}, ${HEIGHT_HALF}`, true],
  10: [`${HEIGHT_HALF}, ${HEIGHT_HALF}, 1, 0`, true],
  11: [`0, 0, ${HEIGHT_HALF}, ${HEIGHT_HALF}`, true],
  12: [`0, 0, 1, 0`, false],
  13: [`1, 1, 0, 0`, true],
  14: [`1, ${HEIGHT_HALF}, 0, 0`, true],
  15: [`1, 1, 0, ${HEIGHT_HALF}`, true],
  16: [`1, ${MID_THIRD}, 0, 0`, true],
  17: [`1, ${NEAR_THIRD}, 0, ${MID_THIRD}`, true],
  18: [`1, 1, 0, ${NEAR_THIRD}`, true],
  19: [`1, 1

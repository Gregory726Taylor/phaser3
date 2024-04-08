/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Type representing an ad instance.
 */
interface AdInstance {
  instance: any;
  placementID: string;
  shown: boolean;
  video: boolean;
  type: "interstitial" | "rewarded";
}

/**
 * Creates a new `AdInstance` object.
 * @param placementID - The Audience Network placement ID of this ad instance.
 * @param instance - Represents an instance of an ad.
 * @param video - Is this a video ad?
 * @param type - The type of ad (e.g., "interstitial", "rewarded").
 */
const AdInstance = (placementID: string, instance: any, video: boolean, type: "interstitial" | "rewarded"): AdInstance => ({
  instance,
  placementID,
  shown: false,
  video,
  type,
});

export default AdInstance;

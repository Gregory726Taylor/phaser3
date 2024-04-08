/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

const GetFastValue = require('../../../src/utils/object/GetFastValue');

/**
 * @typedef {object} Purchase
 *
 * @property {string} [developerPayload] - A developer-specified string, provided during the purchase of the product.
 * @property {string} [paymentID] - The identifier for the purchase transaction.
 * @property {string} [productID] - The product's game-specified identifier.
 * @property {string} [purchaseTime] - Unix timestamp of when the purchase occurred.
 * @property {string} [purchaseToken] - A token representing the purchase that may be used to consume the purchase.
 * @property {string} [signedRequest] - Server-signed encoding of the purchase request.
 */

const Purchase = (data = {}) => {
  const {
    developerPayload = '',
    paymentID = '',
    productID = '',
    purchaseTime = '',
    purchaseToken = '',
    signedRequest = ''
  } = data;

  return {
    developerPayload,
    paymentID,
    productID,
    purchaseTime,
    purchaseToken,
    signedRequest
  };
};

module.exports = Purchase;

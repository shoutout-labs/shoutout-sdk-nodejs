'use strict';

var restletUtils = require('../restletUtils');
var securityUtils = require('../securityUtils');

/**
 * @class ShoutOUT
 * @param {string} [endpoint] - Deprecated/unused; kept for constructor-signature compatibility.
 * @param {string} [messagesEndpoint] - The API endpoint used for the Direct Message API
 * (postMessages/postMessagesV1).
 */
function ShoutOUT(endpoint, messagesEndpoint) {
  if (restletUtils.isDefined(messagesEndpoint) && (!restletUtils.isString(messagesEndpoint) || restletUtils.isString(messagesEndpoint) && messagesEndpoint.length === 0)) {
    throw new Error('messagesEndpoint parameter must be a non-empty string.');
  }

  this.messagesSecurity = {};
  this.securityConfigurations = {};
  this.messagesEndpoint = restletUtils.stripTrailingSlash(messagesEndpoint || 'https://backgroundservice.getshoutout.com');
}

/**
 * Sets up authentication for the Direct Message API (postMessages/postMessagesV1) using
 * an organization API key. The Direct Message API requires the `Authorization: Apikey <key>`
 * header format (validated against a scoped API key with the `message:send` scope).
 *
 * @method
 * @name ShoutOUT#configureMessagesApiKey
 * @param {string} apiKey - the organization API key generated in the ShoutOUT Dashboard
 * under Developer -> API Keys, with the `message:send` scope.
 */
ShoutOUT.prototype.configureMessagesApiKey = function (apiKey) {
  this.messagesSecurity = {
    type: 'OAUTH2',
    token: 'Apikey ' + apiKey
  };
};

/**
 * Sends a direct message (SMS, and internally email) to one or more recipients.
 * POSTs to `{messagesEndpoint}/messages`. Requires authentication via
 * `configureMessagesApiKey` (an API key with the `message:send` scope).
 *
 * @method
 * @name ShoutOUT#postMessages
 * @param {object} body - the payload; is of type: DirectMessageRequest; has the following structure:
{
  "source" : "ShoutDEMO",
  "destinations" : [ "+94771234567" ],
  "content" : { "sms": "Your order ORD-4821 has been dispatched." },
  "transports" : [ "sms" ]
}
 * Instead of `content`, a saved template may be used via `templateId` (UUID) plus an optional
 * `customAttributes` map of `{{placeholder}}` substitutions. `content` and `templateId` are
 * mutually exclusive.
 * @param {object} config - the configuration object containing the query parameters and additional headers.
 * @param {object} config.headers - headers to use for the request in addition to the default ones.
 * @param {object} config.queryParameters - query parameters to use for the request in addition to the default ones.
 * @param {Function} callback - the callback called after request completion with the following parameters:
 *  - error if any technical error occured or if the response's status does not belong to the 2xx range. In that case the error would have the following structure:
{
  status : 400,
  message : 'The request cannot be fulfilled due to XXX'
}
 *  - body of the response auto-extracted from the response if the status is in the 2xx range.
 *    - Status code : 200 - 200 response - Payload :
{
  "status" : "1001",
  "description" : "Message successfully processed",
  "cost" : "2.00",
  "responses" : [
    {
      "destination" : "+94771234567",
      "reference_id" : "a3f1c2b4-9e87-4c3a-b1f2-9e8d7c6b5a4e",
      "status" : "1001",
      "cost" : "2.00"
    }
  ]
}
 *    NOTE: `cost` is a decimal string (e.g. "2.00"), not a number.
 *  - response the technical (low-level) node response (c.f. https://nodejs.org/api/http.html#http_http_incomingmessage)
 */
ShoutOUT.prototype.postMessages = function(body, config, callback) {
  restletUtils.executeRequest.call(this, 'POST',
    this.messagesEndpoint + '/messages',
    callback,
    securityUtils.addSecurityConfiguration(config, this.messagesSecurity, this.securityConfigurations),
    body
  );
};

/**
 * Sends a direct message via the versioned, priority-aware endpoint.
 * POSTs to `{messagesEndpoint}/v1/messages`. Identical request/response contract to
 * `postMessages`, plus an optional `priority` field (`0` or `1`, default `0`). Setting
 * `priority: 1` queues the message ahead of normal transactional traffic for a small
 * additional credit surcharge per destination, reflected in the returned `cost`.
 * Requires authentication via `configureMessagesApiKey`.
 *
 * @method
 * @name ShoutOUT#postMessagesV1
 * @param {object} body - same structure as `postMessages`, plus optional `priority: 0 | 1`.
 * @param {object} config - the configuration object containing the query parameters and additional headers.
 * @param {Function} callback - see `postMessages` for the callback and response structure.
 */
ShoutOUT.prototype.postMessagesV1 = function(body, config, callback) {
  restletUtils.executeRequest.call(this, 'POST',
    this.messagesEndpoint + '/v1/messages',
    callback,
    securityUtils.addSecurityConfiguration(config, this.messagesSecurity, this.securityConfigurations),
    body
  );
};

/**
 * Sends a One Time Password (OTP) to a single recipient via SMS.
 * POSTs to `{messagesEndpoint}/send`. Requires authentication via
 * `configureMessagesApiKey`.
 *
 * @method
 * @name ShoutOUT#postOtpSend
 * @param {object} body - the payload; is of type: OtpSendRequest; has the following structure:
{
  "source" : "ShoutDEMO",
  "destination" : "+94771234567",
  "content" : { "sms": "Your verification code is {{code}}" },
  "transport" : "sms"
}
 * `content.sms` must include the `{{code}}` placeholder, which is substituted with the
 * generated OTP.
 * @param {object} config - the configuration object containing the query parameters and additional headers.
 * @param {object} config.headers - headers to use for the request in addition to the default ones.
 * @param {object} config.queryParameters - query parameters to use for the request in addition to the default ones.
 * @param {Function} callback - the callback called after request completion with the following parameters:
 *  - error if any technical error occured or if the response's status does not belong to the 2xx range. In that case the error would have the following structure:
{
  status : 400,
  message : 'The request cannot be fulfilled due to XXX'
}
 *  - body of the response auto-extracted from the response if the status is in the 2xx range.
 *    - Status code : 200 - 200 response - Payload :
{
  "status" : "1001",
  "description" : "OTP sent successfully",
  "referenceId" : "a3f1c2b4-9e87-4c3a-b1f2-9e8d7c6b5a4e"
}
 *  - response the technical (low-level) node response (c.f. https://nodejs.org/api/http.html#http_http_incomingmessage)
 */
ShoutOUT.prototype.postOtpSend = function(body, config, callback) {
  restletUtils.executeRequest.call(this, 'POST',
    this.messagesEndpoint + '/send',
    callback,
    securityUtils.addSecurityConfiguration(config, this.messagesSecurity, this.securityConfigurations),
    body
  );
};

/**
 * Verifies a previously sent One Time Password (OTP).
 * POSTs to `{messagesEndpoint}/verify`. Requires authentication via
 * `configureMessagesApiKey`.
 *
 * @method
 * @name ShoutOUT#postOtpVerify
 * @param {object} body - the payload; is of type: OtpVerifyRequest; has the following structure:
{
  "code" : "12345",
  "referenceId" : "a3f1c2b4-9e87-4c3a-b1f2-9e8d7c6b5a4e"
}
 * @param {object} config - the configuration object containing the query parameters and additional headers.
 * @param {Function} callback - the callback called after request completion with the following parameters:
 *  - error if any technical error occured or if the response's status does not belong to the 2xx range.
 *  - body of the response auto-extracted from the response if the status is in the 2xx range.
 *    - Status code : 200 - 200 response - Payload :
{
  "status" : "1001",
  "description" : "OTP verified successfully",
  "valid" : true
}
 *    NOTE: an invalid OTP is still a 200 response with `valid: false` and a non-success `status`.
 *  - response the technical (low-level) node response (c.f. https://nodejs.org/api/http.html#http_http_incomingmessage)
 */
ShoutOUT.prototype.postOtpVerify = function(body, config, callback) {
  restletUtils.executeRequest.call(this, 'POST',
    this.messagesEndpoint + '/verify',
    callback,
    securityUtils.addSecurityConfiguration(config, this.messagesSecurity, this.securityConfigurations),
    body
  );
};

module.exports = ShoutOUT;

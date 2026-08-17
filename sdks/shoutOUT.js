'use strict';

var util = require('util');
var restletUtils = require('../restletUtils');
var securityUtils = require('../securityUtils');

/**
 * @class ShoutOUT
 * @param {string} [endpoint] - The API endpoint used for legacy Contacts/Activities calls.
 * @param {string} [messagesEndpoint] - The API endpoint used for the Direct Message API
 * (postMessages/postMessagesV1). Defaults to the same host as `endpoint` without the
 * `/coreservice` path segment, since `/messages` and `/v1/messages` are top-level routes.
 */
function ShoutOUT(endpoint, messagesEndpoint) {
  if (restletUtils.isDefined(endpoint) && (!restletUtils.isString(endpoint) || restletUtils.isString(endpoint) && endpoint.length === 0)) {
    throw new Error('endpoint parameter must be a non-empty string.');
  }
  if (restletUtils.isDefined(messagesEndpoint) && (!restletUtils.isString(messagesEndpoint) || restletUtils.isString(messagesEndpoint) && messagesEndpoint.length === 0)) {
    throw new Error('messagesEndpoint parameter must be a non-empty string.');
  }

  this.globalSecurity = {};
  this.messagesSecurity = {};
  this.securityConfigurations = {};
  this.endpoint = restletUtils.stripTrailingSlash(endpoint || 'https://api.getshoutout.com/coreservice');
  this.messagesEndpoint = restletUtils.stripTrailingSlash(
    messagesEndpoint || this.endpoint.replace(/\/coreservice$/, '')
  );
}

/**
 * Sets up the authentication to be performed through API token
 *
 * @method
 * @name ShoutOUT#setApiToken
 * @param {string} tokenName - the name of the query parameter or header based on the location parameter.
 * @param {string} tokenValue - the value of the token
 * @param {string} location - the location of the token, either 'HEADER' or 'QUERY'.
 * If undefined it defaults to 'header'.
 */
ShoutOUT.prototype.configureGlobalApiToken = function(tokenName, tokenValue, location) {
  if (restletUtils.isUndefined(location)) {
    util.log('No location defined, it defaults to \'HEADER\'');
    location = 'HEADER';
  }

  if (location.toUpperCase() !== 'HEADER' && location.toUpperCase() !== 'QUERY') {
    throw new Error('Unknown location: ' + location);
  }

  this.globalSecurity = {
    type: 'API_KEY',
    placement: location.toUpperCase(),
    name: tokenName,
    token: tokenValue
  };
};

/**
 * Sets up the authentication to be performed through oAuth2 protocol
 * meaning that the Authorization header will contain a Bearer token.
 *
 * @method
 * @param token - the oAuth token to use
 */
ShoutOUT.prototype.configureGlobalOAuth2Token = function (token) {
  this.globalSecurity = {
    type: 'OAUTH2',
    token: 'Bearer ' + token
  };
};

/**
 * Sets up the authentication to be performed through basic auth.
 *
 * @method
 * @name ShoutOUT#setBasicAuth
 * @param {string} username - the user's username
 * @param {string} key - the user's key or password
 */
ShoutOUT.prototype.configureGlobalBasicAuthentication = function(username, key) {
  this.globalSecurity = {
    type: 'BASIC',
    token: 'Basic ' + new Buffer(username + ':' + key).toString('base64')
  };
};

/**
 * Sets up authentication for the Direct Message API (postMessages/postMessagesV1) using
 * an organization API key. The Direct Message API requires the `Authorization: Apikey <key>`
 * header format (validated against a scoped API key with the `message:send` scope) — this is
 * distinct from `configureGlobalOAuth2Token`, which sends a `Bearer` token and is used for the
 * legacy Contacts/Activities endpoints.
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
 * 
 * @method
 * @name ShoutOUT#postActivitiesRecords
 * @param {object} body - the payload; is of type: ActivityRecord; has the following structure:
{
  "activity_data" : null,
  "activity_id" : "sample activity_id",
  "activity_name" : "sample activity_name",
  "user_id" : "sample user_id"
}
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
  "code" : 1,
  "message" : "sample message"
}
 *  - response the technical (low-level) node response (c.f. https://nodejs.org/api/http.html#http_http_incomingmessage)
 */
ShoutOUT.prototype.postActivitiesRecords = function(body, config, callback) {
  restletUtils.executeRequest.call(this, 'POST',
    this.endpoint + '/activities',
    callback,
    securityUtils.addSecurityConfiguration(config, this.globalSecurity, this.securityConfigurations),
    body
  );
};

/**
 * 
 * @method
 * @name ShoutOUT#postContacts
 * @param {object} body - the payload; is of type: Contact; has the following structure:
{ }
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
 *  - response the technical (low-level) node response (c.f. https://nodejs.org/api/http.html#http_http_incomingmessage)
 */
ShoutOUT.prototype.postContacts = function(body, config, callback) {
  restletUtils.executeRequest.call(this, 'POST',
    this.endpoint + '/contacts',
    callback,
    securityUtils.addSecurityConfiguration(config, this.globalSecurity, this.securityConfigurations),
    body
  );
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

module.exports = ShoutOUT;

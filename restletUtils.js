'use strict';

var axios = require('axios');

function executeRequest (method, uri, callback, config, body) {
  axios(prepareRequest.call(this, method, uri, config, body))
    .then(function (response) {
      completeRequest(callback, undefined, normalizeResponse(response), response.data);
    })
    .catch(function (error) {
      if (error.response) {
        completeRequest(callback, undefined, normalizeResponse(error.response), error.response.data);
      } else {
        completeRequest(callback, error, undefined, undefined);
      }
    });
}

function prepareRequest (method, uri, config, body) {
  if (isUndefined(config)) {
    config = {};
  }

  return {
    method: method,
    url: uri,
    params: config.queryParameters,
    headers: config.headers,
    data: body,
    validateStatus: false
  };
}

function normalizeResponse (response) {
  return {
    statusCode: response.status,
    headers: response.headers,
    body: response.data
  };
}

function completeRequest (callback, error, response, body) {
  if (error) {
    callback(error, body, response);
  } else if (response.statusCode < 200 || response.statusCode > 299) {
    callback({
      status: response.statusCode,
      message: response.body
    }, body, response);
  } else if (isJsonMimeType(response.headers['content-type'])) {
    handleJson(callback, response, body);
  } else {
    callback(undefined, body, response);
  }
}

function checkPathVariables () {
  var errors = [];
  for (var i = 0; i < arguments.length; i += 2) {
    if (!isNumber(arguments[i]) && !isString(arguments[i]) && !isBoolean(arguments[i])) {
      errors.push(arguments[i + 1]);
    }
  }
  if (errors.length > 0) {
    throw new Error(errors.join(', ') + ' must be defined');
  }
}

function isDefined (value) {
  return !isUndefined(value);
}

function isUndefined (value) {
  return is(value, 'undefined');
}

function isString (value) {
  return is(value, 'string');
}

function isBoolean (value) {
  return is(value, 'boolean');
}

function isNumber (value) {
  return is(value, 'number');
}

function isFunction (value) {
  return is(value, 'function');
}

function isObject (value) {
  return is(value, 'object');
}

function is (value, type) {
  return typeof value === type;
}

function isJsonMimeType (contentType) {
  return /^application\/(.*\\+)?json/.test(contentType);
}

function handleJson (callback, response, body) {
  var error;
  if (isString(body)) {
    try {
      body = JSON.parse(body);
    } catch (e) {
      error = {
        status: 0,
        message: 'Received JSON is invalid'
      };
    }
  }

  callback(error, body, response);
}

function stripTrailingSlash (value) {
  return value.replace(/\/$/i, '');
}

function isEmpty (obj) {
  return Object.keys(obj).length === 0;
}

module.exports = {
  isString: isString,
  isUndefined: isUndefined,
  isDefined: isDefined,
  isFunction: isFunction,
  isEmpty: isEmpty,
  stripTrailingSlash: stripTrailingSlash,
  checkPathVariables: checkPathVariables,
  executeRequest: executeRequest
};
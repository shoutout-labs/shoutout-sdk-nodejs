## ShoutOUT SDK for Nodejs

#### Input source
__ShoutOUT - version: 1.0.0__

ShoutOUT API

#### Requirements

This SDK requires a Node.js (at least version 0.10.4). It also requires the Node Package Manager aka npm to resolve the dependencies.

#### Structure

* `package.json` contains the definition of the SDK and its dependencies
* `index.js` is the entry point for the generated module
* `restletUtils.js` a standalone helper file for the SDK
* `securityUtils.js` some utility methods to handle the security in the SDKs
* `README.md` the current file
* `sdks/shoutOUT.js` is the source of the generated SDK

#### Usage

##### Installation

```sh
# Install the SDK
npm install shoutout-sdk --save
```

##### Coding with the SDK

Considering an API called sdk_test with the following endpoints:
* GET /companies/{companyId}
* POST /companies

The generated SDK would contain the following methods

```js
/**
 * Loads a Company
 *
 */
MyCompanyApi.prototype.getCompany = function(companyid, config, callback) {
	/* ... */
};

/**
 * Adds a Company
 *
 */
MyCompanyApi.prototype.postCompanyList = function(parameters, body, callback) {
	/* ... */
};
```

With these methods, an API call would be done with the following code :

```js
var MySDK = require('MySDK');

// using MyCompanyApi api
var myCompanyApi = new MySDK.MyCompanyApi();

// Let's set up the basic auth
myCompanyApi.setBasicAuth('login', 'password');

var config = {
  queryParameters: {
    'Hello': 'World'
  }
}

// Get the company of id 1
myCompanyApi.getCompany(1, config, function(err, company, response) {
  if (err) {
    if (err.status >= 400 && err.status <= 499) {
      console.log('Client error ' + err.status + ': ' + err.message);
    } else if (err.status >= 500 && err.status <= 599) {
      console.log('Server error ' + err.status + ': ' + err.message);
    } else {
      console.log('Unknown error ' + err.status + ': ' + err.message);
    }
  }

  console.log('Company with ID 1:', company);
});

// Add a new company
myCompanyApi.postCompanyList({}, {
    "tags": [ "IT", "API" ],
    "id": "mycompany",
    "address": null,
    "name": "MyCompany"
  },
  function(err, company, response) {
    console.log('Company created', company);
  });

```

##### Authentication

The SDK provides two authentication mechanisms:

* the first is global and is used, if configured, for any request which does not have any specified security
* the second is user-specific security which must be configured if some requests require it

###### Global authentication

The global authentication is provided through 3 standard methods:

* `configureGlobalBasicAuthentication(username, password)` sets automatically for each requests the `Authorization: Basic` header
* `configureGlobalApiToken(tokenName, tokenValue, location)` sets the API token in the specified location (either `HEADER`
or `QUERY`) using the provided name and value
* `configureGlobalOAuth2Token(token)` sets automatically for each requests the `Authorization: Bearer` header

###### User-specific authentication

####### ShoutOUT

There is no user-specific authentication mechanism in the SDK.

#### JSON content - autoparsing

Responses from the server will be automatically parsed if the `Content-Type` is JSON.

This means that the second parameter of the callback function would be an `object` instead of a `string`.

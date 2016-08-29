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

##Configure SDK
```js
var ShoutOUT = require('shoutout-sdk');
var shoutout = new ShoutOUT();
shoutout.configureGlobalOAuth2Token('API_KEY');
```
#Create Contact
##Example
```js
    var contact = {
        user_id: {'s': 'UID001'},
        mobile_number: {'s': '94771234567'},
        name: {'s': 'Saman'},
        email: {'s': 'saman@test.com'}
    };
    shoutout.postContacts(contact, {}, function (err, result, response) {
        if (err) {
            console.error('Error creating shoutout contact!');
        } else {
            console.log('Creating shoutout contact successful!');
        }
    });
```
#Send Message
##Example
```js
var message = {
    "content": {"sms": "Testing SMS Gateway"},
    "destinations": ["94771234567"],
    "source": "ShoutDEMO",
    "transports": ["SMS"]
};

shoutout.postMessages(message, {}, function (err, result, response) {
    if (err) {
        console.error('Error sending message!');
    } else {
        console.log('Sending message successful!');
    }
});
```

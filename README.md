## ShoutOUT SDK for Nodejs
__version: 1.0.3__

### Requirements

This SDK requires a Node.js (at least version 0.10.4). It also requires the Node Package Manager aka npm to resolve the dependencies.

### Structure

* `package.json` contains the definition of the SDK and its dependencies
* `index.js` is the entry point for the generated module
* `restletUtils.js` a standalone helper file for the SDK
* `securityUtils.js` some utility methods to handle the security in the SDKs
* `README.md` the current file
* `sdks/shoutOUT.js` is the source of the generated SDK

### Install

```sh
# Install the SDK
npm install shoutout-sdk --save
```

### Configure SDK
```js
var ShoutOUT = require('shoutout-sdk');
var shoutout = new ShoutOUT();
shoutout.configureGlobalOAuth2Token('API_KEY');
```
###Create Contact
####Example
```js
var contact = {
    user_id: {'s': 'UID001'}, // use mobile number, email or your own unique id
    mobile_number: {'s': '94771234567'},
    name: {'s': 'Saman'},
    email: {'s': 'saman@test.com'}
};
shoutout.postContacts(contact, {}, function (err, result, response) {
    if (err) {
        console.error('Error creating shoutout contact!');
    } else {
        console.info('Creating shoutout contact successful!');
    }
});
```

###Track Activity
####Example
```js
var activity = {
    user_id: 'UID001',
    activity_name: 'Sample Activity',
    activity_data: {
        param_1: 'param 1',
        param_2: 'param 2',
        param_3: 'param 3'
    }
};
shoutout.postActivitiesRecords(activity, {}, function (err, result, response) {
    if (err) {
        console.error('Error creating activity!');
    } else {
        console.info('Creating activity successful!');
    }
});
```

###Send Message
####Example
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

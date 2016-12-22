## ShoutOUT SDK for Nodejs
__version: 1.0.5__

### Requirements

This SDK requires a Node.js (at least version 0.10.4). It also requires the Node Package Manager aka npm to resolve the dependencies.

### Installation

You can install **shoutout-sdk** via npm

#### Via NPM

**shoutout-sdk** is available on NPM as the
[`shoutout-sdk`](https://www.npmjs.com/package/shoutout-sdk) package

### Installation

```sh
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

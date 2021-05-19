## ShoutOUT SDK for Nodejs
__version: 3.0.3__

### Requirements

This SDK requires a Node.js (at least version 4.x). It also requires the Node Package Manager aka npm to resolve the dependencies.

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
var ShoutoutClient = require('shoutout-sdk');

var apiKey = 'XXXXXXXXX.XXXXXXXXX.XXXXXXXXX';

var debug = true, verifySSL = false;

var client = new ShoutoutClient(apiKey, debug, verifySSL);
```
###Create or Update Contacts

####Example
```js
var contacts = [{
    user_id: '94777123456',
    mobile_number: '94777123456',
    email: 'duke@test.com',
    name: 'Duke',
    tags: ['lead']
}];

client.createContacts(contacts, (error, result) => {
    if (error) {
        console.error('error ', error);
    } else {
        console.log('result ', result);
    }
});
```

###Create Activity

####Example
```js
var activity = {
    userId: '94777123456',
    activityName: 'Sample Activity',
    activityData: {
        param1: 'val1',
        param2: 'val2',
        param3: 'val3'
    }
};

client.createActivity(activity, (error, result) => {
    if (error) {
        console.error('error ', error);
    } else {
        console.log('result ', result);
    }
});
```

###Send Message

####Example
```js
var message = {
    source: 'ShoutDEMO',
    destinations: ['94777123456'],
    content: {
        sms: 'Sent via SMS Gateway'
    },
    transports: ['sms']
};

client.sendMessage(message, (error, result) => {
    if (error) {
        console.error('error ', error);
    } else {
        console.log('result ', result);
    }
});
```

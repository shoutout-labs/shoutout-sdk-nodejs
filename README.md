## ShoutOUT SDK for Nodejs
__version: 1.0.0__

### v1.0.0 — Renamed to `@shoutout/sdk`, Direct Message API changes

Starting with this version, the package is published as **`@shoutout/sdk`** (previously
`shoutout-sdk`). The old `shoutout-sdk` package on npm is not updated further — update your
`package.json` dependency and `require('@shoutout/sdk')` import when upgrading.

`sendMessage` now targets the current Direct Message API (`POST /v1/messages`) instead of the
legacy `/coreservice/messages` route. This is a **breaking change** if you parse the response:

- `cost` is now a decimal string (e.g. `"2.00"`) instead of a number, both at the top level and
  per item in `responses`.
- Each item in `responses` now includes a `reference_id` (UUID) you can use to look up delivery
  status.
- The client now authenticates Direct Message API calls with the `Authorization: Apikey <key>`
  header format required by the new backend (previously sent as `Bearer <key>`, which the new
  auth middleware rejects).

New capabilities:
- Send using a saved message template via `templateId` + `customAttributes` (see below).
- Send with paid priority delivery via `client.sendPriorityMessage(...)`, which defaults
  `priority` to `1` on the versioned `POST /v1/messages` endpoint.

### Requirements

This SDK requires a Node.js (at least version 4.x). It also requires the Node Package Manager aka npm to resolve the dependencies.

### Installation

You can install **@shoutout/sdk** via npm

#### Via NPM

**@shoutout/sdk** is available on NPM as the
[`@shoutout/sdk`](https://www.npmjs.com/package/@shoutout/sdk) package

### Installation

```sh
npm install @shoutout/sdk --save
```

### Configure SDK
```js
var ShoutoutClient = require('@shoutout/sdk');

var apiKey = 'XXXXXXXXX.XXXXXXXXX.XXXXXXXXX';

var debug = true, verifySSL = false;

var client = new ShoutoutClient(apiKey, debug, verifySSL);
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
        // result.cost is a decimal string, e.g. "2.00"
        // result.responses[0].reference_id can be used to look up delivery status
    }
});
```

###Send Message via Template

Use a saved message template to avoid repeating content in every request. Placeholders in the
template (`{{name}}`, `{{code}}`, etc.) are substituted from `customAttributes`. `content` and
`templateId` are mutually exclusive.

####Example
```js
var message = {
    source: 'ShoutDEMO',
    destinations: ['94777123456'],
    templateId: '8a3c1f2b-4d9e-4c3a-b1f2-9e8d7c6b5a4e',
    customAttributes: {
        name: 'Kasun',
        order_id: 'ORD-4821'
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

###Send Priority Message

Sends via the same `POST /v1/messages` endpoint as `sendMessage`, but automatically sets
`priority: 1` on the message if you don't already specify one. `priority: 1` queues the message
ahead of normal transactional traffic for a small additional credit surcharge per destination
(reflected in the returned `cost`). Pass `priority: 0` explicitly in the message to opt out of
priority delivery while still using `sendPriorityMessage`.

####Example
```js
var message = {
    source: 'ShoutDEMO',
    destinations: ['94777123456'],
    content: {
        sms: 'Your OTP-adjacent time-sensitive alert'
    },
    transports: ['sms'],
    priority: 1
};

client.sendPriorityMessage(message, (error, result) => {
    if (error) {
        console.error('error ', error);
    } else {
        console.log('result ', result);
    }
});
```

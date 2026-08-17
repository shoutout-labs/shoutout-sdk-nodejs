/**
 * Manual test script for sending an SMS via the ShoutOUT SDK.
 *
 * Usage:
 *   SHOUTOUT_API_KEY=xxx.xxx.xxx SHOUTOUT_SOURCE=ShoutDEMO SHOUTOUT_DESTINATION=94777123456 node test-sms-send.js
 *
 * Or pass values as CLI args (apiKey, source, destination, [message]):
 *   node test-sms-send.js xxx.xxx.xxx ShoutDEMO 94777123456 "Hello from test script"
 */

const ShoutoutClient = require('./index');

const [argApiKey, argSource, argDestination, argMessage] = process.argv.slice(2);

const apiKey = argApiKey || process.env.SHOUTOUT_API_KEY;
const source = argSource || process.env.SHOUTOUT_SOURCE;
const destination = argDestination || process.env.SHOUTOUT_DESTINATION;
const text = argMessage || process.env.SHOUTOUT_MESSAGE || 'Test SMS from shoutout-sdk-nodejs test script';

if (!apiKey || !source || !destination) {
    console.error('Missing required parameters.');
    console.error('Provide apiKey, source, destination via CLI args or SHOUTOUT_API_KEY, SHOUTOUT_SOURCE, SHOUTOUT_DESTINATION env vars.');
    console.error('Example: node test-sms-send.js <apiKey> <source> <destination> ["message"]');
    process.exit(1);
}

const debug = true;
const verifySSL = false;
const messagesEndpoint = 'https://backgroundservice.getshoutout.com';

const client = new ShoutoutClient(apiKey, debug, verifySSL, messagesEndpoint);

const message = {
    source: source,
    destinations: [destination],
    content: {
        sms: text
    },
    transports: ['sms']
};

console.log('Sending SMS with payload:', JSON.stringify(message, null, 2));

client.sendMessage(message, (error, result) => {
    if (error) {
        console.error('SMS send failed:', error);
        process.exit(1);
    } else {
        console.log('SMS send succeeded:', result);
    }
});

/**
 * Created by asankanissanka on 6/16/17.
 */
'use strict';

let ShoutoutClient = require('./../sdks/ShoutoutClient');

let apiKey = 'XXXXXXXXX.XXXXXXXXX.XXXXXXXXX';

let debug = true, verifySSL = false;

let client = new ShoutoutClient(apiKey, debug, verifySSL);

let contacts = [{
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

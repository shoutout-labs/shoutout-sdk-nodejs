/**
 * Created by asankanissanka on 6/16/17.
 */

var ShoutoutClient = require('./../sdks/ShoutoutClient');

var apiKey = 'XXXXXXXXX.XXXXXXXXX.XXXXXXXXX';

var debug = true, verifySSL = false;

var client = new ShoutoutClient(apiKey, debug, verifySSL);

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

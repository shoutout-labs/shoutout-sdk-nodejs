/**
 * Created by asankanissanka on 6/16/17.
 */
'use strict';

let ShoutoutClient = require('./../sdks/ShoutoutClient');

let apiKey = 'XXXXXXXXX.XXXXXXXXX.XXXXXXXXX';

let debug = true, verifySSL = false;

let client = new ShoutoutClient(apiKey, debug, verifySSL);

let activity = {
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

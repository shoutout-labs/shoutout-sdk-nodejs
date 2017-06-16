/**
 * Created by asankanissanka on 6/16/17.
 */

var ShoutOUT = require('./shoutOUT');

class ShoutoutClient{
    constructor(apiKey, debug, verifySSL){
        this.shoutout = new ShoutOUT();
        this.shoutout.configureGlobalOAuth2Token(apiKey);

    }

    createContacts(contacts,callback){
        this.shoutout.postContacts(contacts, {}, function (err, result, response) {
            if (err) {
                callback(err);
            } else {
                callback(null,result);
            }
        });
    }

    createActivity(activity,callback){
        this.shoutout.postActivitiesRecords(activity, {}, function (err, result, response) {
            if (err) {
                callback(err);
            } else {
                callback(null,result);
            }
        });
    }

    sendMessage(message,callback){
        this.shoutout.postMessages(message, {}, function (err, result, response) {
            if (err) {
                callback(err);
            } else {
                callback(null,result);
            }
        });

    }
}

module.exports = ShoutoutClient;
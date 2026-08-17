/**
 * Created by asankanissanka on 6/16/17.
 */

var ShoutOUT = require('./shoutOUT');

class ShoutoutClient{
    constructor(apiKey, debug, verifySSL, messagesEndpoint){
        this.shoutout = new ShoutOUT(undefined, messagesEndpoint);
        this.shoutout.configureGlobalOAuth2Token(apiKey);
        this.shoutout.configureMessagesApiKey(apiKey);

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

    sendPriorityMessage(message,callback){
        this.shoutout.postMessagesV1(message, {}, function (err, result, response) {
            if (err) {
                callback(err);
            } else {
                callback(null,result);
            }
        });

    }
}

module.exports = ShoutoutClient;
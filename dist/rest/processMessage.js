"use strict";
var request = require('request');
var PAGE_ACCESS_TOKEN = 'EAAgbvoe81VcBALys7JWv8ARh4Y9bVvjnVwuHdKZAaR5A83JMnthSIpqMnP1ZCZBUObFNB5dHj1QAuFipIZBPuZCUcZCtu0S42PuAVn197v4ROA0WF1XmZAJ0ZA0XuvVutxd85secJsR41MY9JZCDaKj2qeWEPtmNu0WtigpZB2WB0IxZCGqPWEpeykM';
function handleMessage(sender_psid, received_message) {
    var response;
    if (received_message.text) {
        response = {
            "text": "You sent the message: \"" + received_message.text + "\". Now send me an attachment!"
        };
    }
    else if (received_message.attachments) {
        var attachment_url = received_message.attachments[0].payload.url;
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                            "title": "Is this the right picture?",
                            "subtitle": "Tap a button to answer.",
                            "image_url": attachment_url,
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Yes!",
                                    "payload": "yes",
                                },
                                {
                                    "type": "postback",
                                    "title": "No!",
                                    "payload": "no",
                                }
                            ],
                        }]
                }
            }
        };
    }
    callSendAPI(sender_psid, response);
}
function handlePostback(sender_psid, received_postback) {
    console.log('ok');
    var response;
    var payload = received_postback.payload;
    if (payload === 'yes') {
        response = { "text": "Thanks!" };
    }
    else if (payload === 'no') {
        response = { "text": "Oops, try sending another image." };
    }
    callSendAPI(sender_psid, response);
}
function callSendAPI(sender_psid, response) {
    var request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    };
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, function (err, res, body) {
        if (!err) {
            console.log('message sent!');
        }
        else {
            console.error("Unable to send message:" + err);
        }
    });
}
function ProcessMessage(req, res) {
    var body = JSON.parse(req.body);
    console.log('postHandler');
    if (body.object === 'page') {
        console.log('in if branch');
        body.entry.forEach(function (entry) {
            var webhook_event = entry.messaging[0];
            console.log("webhook_event" + webhook_event.message);
            var sender_psid = webhook_event.sender.id;
            console.log('Sender ID: ' + sender_psid);
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            }
            else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }
        });
        res.send(200, 'EVENT_RECEIVED');
    }
    else {
        res.send(404);
    }
    ;
}
exports.ProcessMessage = ProcessMessage;
//# sourceMappingURL=ProcessMessage.js.map
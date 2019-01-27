"use strict";
function Verification(req, res) {
    var VERIFY_TOKEN = "stalkiebot";
    var query = req.query();
    var parts = query.split('&');
    var object = parts.reduce(function (tmp, part) {
        var subparts = part.split('=');
        var key = subparts[0];
        var value = subparts[1];
        tmp[key] = value;
        return tmp;
    }, {});
    var mode = object['hub.mode'];
    var token = object['hub.verify_token'];
    var challenge = object['hub.challenge'];
    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.contentType = "text/plain";
            res.send(200, challenge);
        }
        else {
            res.send(403);
        }
    }
}
exports.Verification = Verification;
//# sourceMappingURL=Verification.js.map
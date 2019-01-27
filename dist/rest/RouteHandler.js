"use strict";
var Util_1 = require('../Util');
var RouteHandler = (function () {
    function RouteHandler() {
    }
    RouteHandler.getHandler = function (req, res, next) {
        Util_1.default.info('RoutHandler::getHandler(..) - params: ' + JSON.stringify(req.params));
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
                res.status(403);
            }
        }
        return next();
    };
    RouteHandler.postHandler = function (req, res, next) {
        Util_1.default.trace('RouteHandler::postHandler(..) - params: ' + JSON.stringify(req.params));
        return next();
    };
    return RouteHandler;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RouteHandler;
//# sourceMappingURL=RouteHandler.js.map
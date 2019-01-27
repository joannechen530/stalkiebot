"use strict";
var Util_1 = require('../Util');
var Verification_1 = require('./Verification');
var ProcessMessage_1 = require('./ProcessMessage');
var RouteHandler = (function () {
    function RouteHandler() {
    }
    RouteHandler.getHandler = function (req, res, next) {
        Util_1.default.info('RoutHandler::getHandler(..) - params: ' + JSON.stringify(req.params));
        Verification_1.Verification(req, res);
        return next();
    };
    RouteHandler.postHandler = function (req, res, next) {
        Util_1.default.trace('RouteHandler::postHandler(..) - params: ' + JSON.stringify(req.params));
        ProcessMessage_1.ProcessMessage(req, res);
        return next();
    };
    return RouteHandler;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RouteHandler;
//# sourceMappingURL=RouteHandler.js.map
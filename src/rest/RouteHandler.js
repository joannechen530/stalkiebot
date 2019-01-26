"use strict";
var Util_1 = require('../Util');
var RouteHandler = (function () {
    function RouteHandler() {
    }
    RouteHandler.getHandler = function (req, res, next) {
        Util_1.default.trace('RoutHandler::getHomepage(..) - params: ' + JSON.stringify(req.params));
        return next();
    };
    RouteHandler.postHandler = function (req, res, next) {
        Util_1.default.trace('RouteHandler::postQuery(..) - params: ' + JSON.stringify(req.params));
        return next();
    };
    return RouteHandler;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RouteHandler;
//# sourceMappingURL=RouteHandler.js.map
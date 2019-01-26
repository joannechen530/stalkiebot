import restify = require('restify');

import Log from '../Util';

export default class RouteHandler {

    public static getHandler(req: restify.Request, res: restify.Response, next: restify.Next) {
        Log.trace('RoutHandler::getHomepage(..) - params: ' + JSON.stringify(req.params));

        return next();
    }

     public static postHandler(req: restify.Request, res: restify.Response, next: restify.Next) {
        Log.trace('RouteHandler::postQuery(..) - params: ' + JSON.stringify(req.params));

        return next();
    }
}

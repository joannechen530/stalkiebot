import restify = require('restify');

import Log from '../Util';

export default class RouteHandler {

    public static getHandler(req: restify.Request, res: restify.Response, next: restify.Next) {
        Log.trace('RoutHandler::getHandler(..) - params: ' + JSON.stringify(req.params));

        return next();
    }

     public static postHandler(req: restify.Request, res: restify.Response, next: restify.Next) {
        Log.trace('RouteHandler::postHandler(..) - params: ' + JSON.stringify(req.params));

        return next();
    }
}

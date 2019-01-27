import restify = require('restify');
import Log from '../Util';
import { Verification } from './Verification';
import { ProcessMessage } from './ProcessMessage';

export default class RouteHandler {

    // http://localhost:4321/webhook?hub.mode=subscribe&hub.challenge=foobar&hub.verify_token=stalkiebot
    public static getHandler(req: restify.Request, res: restify.Response, next: restify.Next) {
        Log.info('RoutHandler::getHandler(..) - params: ' + JSON.stringify(req.params));
        Verification(req, res);
        return next();
    }

    public static postHandler(req: restify.Request, res: restify.Response, next: restify.Next) {
        Log.trace('RouteHandler::postHandler(..) - params: ' + JSON.stringify(req.params));
        ProcessMessage(req, res);
        return next();
    }
}
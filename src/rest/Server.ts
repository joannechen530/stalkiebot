/**
 * Created by rtholmes on 2016-06-19.
 */

import restify = require('restify');

import Log from "../Util";
import RouteHandler from './RouteHandler';

/**
 * This configures the REST endpoints for the server.
 */
export default class Server {

    private port: number;
    private host: string;
    private rest: restify.Server;

    constructor(host: string, port: number) {
        Log.info("Server::<init>( " + port + " )");
        this.host = host;
        this.port = port;
    }

    /**
     * Stops the server. Again returns a promise so we know when the connections have
     * actually been fully closed and the port has been released.
     *
     * @returns {Promise<boolean>}
     */
    public stop(): Promise<boolean> {
        Log.info('Server::close()');
        let that = this;
        return new Promise(function (fulfill) {
            that.rest.close(function () {
                fulfill(true);
            });
        });
    }

    /**
     * Starts the server. Returns a promise with a boolean value. Promises are used
     * here because starting the server takes some time and we want to know when it
     * is done (and if it worked).
     *
     * @returns {Promise<boolean>}
     */
    public start(): Promise<boolean> {
        let that = this;
        return new Promise(function (fulfill, reject) {
            try {
                Log.info('Server::start() - start');

                that.rest = restify.createServer({
                    name: 'stalkiebot'
                });

                // Loads the homepage.
                // curl -is  http://localhost:4321/
                that.rest.get('/webhook', RouteHandler.getHandler);

                that.rest.post('/webhook', restify.bodyParser(), RouteHandler.postHandler);

                that.rest.listen(that.port, that.host, function () {
                    Log.info('Server::start() - restify listening: ' + that.rest.url);
                    fulfill(true);
                });

                that.rest.on('error', function (err: string) {
                    // catches errors in restify start; unusual syntax due to internal node not using normal exceptions here
                    Log.info('Server::start() - restify ERROR: ' + err);
                    reject(err);
                });
            } catch (err) {
                Log.error('Server::start() - ERROR: ' + err);
                reject(err);
            }
        });
    }
}

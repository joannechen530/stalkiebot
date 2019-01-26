/**
 * Created by rtholmes on 2016-06-19.
 */

import Server from './rest/Server';
import Log from './Util';

/**
 * Starts the server; doesn't listen to whether the start was successful.
 */
export class App {
    public initServer(host: string, port: number) {
        Log.info('App::initServer( ' + host + ':' + port + ' ) - start');
        let s = new Server(host, port);
        s.start().then(function (val: boolean) {
            Log.info("App::initServer() - started: " + val);
        }).catch(function (err: Error) {
            Log.error("App::initServer() - ERROR: " + err.message);
        });
    }
}

// This ends up starting the whole system and listens on a hardcoded port (4321)
Log.info('App - starting');
let app = new App();
app.initServer('localhost', 4321);

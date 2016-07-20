/// <reference path="typings/tsd.d.ts" />

import * as express from "express";

module AppBackEnd {

    export class Server {

        private _app: express.Application;
        private _msg: string = "Hello world";
        private _consoleLogStartMsg: string = 'App listening on port: ';

        constructor(port: number) {
            this._app = express();
            this.initExpressServer(port);
        }

        private initExpressServer(port: number){
            this._app.get('/', (req, res) => { res.send(this._msg) });
            this._app.listen(port, () => console.log(this._consoleLogStartMsg + port));
        }
    }
}

new AppBackEnd.Server(3000);
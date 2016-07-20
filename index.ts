/// <reference path="typings/tsd.d.ts" />

import * as express from "express";
import * as mongodb from "mongodb";

module AppBackEnd {

    export class Server {

        private _app: express.Application;
        private _msg: string = "Hello world";
        private _consoleLogStartMsg: string = 'App listening on port: ';
        private _uri: string = "mongodb://localhost:27017/test";

        constructor(port: number) {
            this._app = express();
            this.initExpressServer(port);
        }

        private initExpressServer(port: number): void {
            mongodb.MongoClient.connect(this._uri, (error, db) => {
               this.mongoConnectHandler(error, db, port); 
            });
        }

        private mongoConnectHandler(error: mongodb.MongoError, db: mongodb.Db, port: number): void {
            this.mongoErrorHandler(error);
            let result: string;
            db.collection('test').find().toArray((error, docs) => {
                this.mongoErrorHandler(error);
                docs.forEach((doc) => {
                    result += JSON.stringify(doc);
                });
            });
            this._app.get('/', (req, res) => { res.send(result) });
            this._app.listen(port, () => console.log(this._consoleLogStartMsg + port));
        }

        private mongoErrorHandler(error: mongodb.MongoError): void {
            if (!error) return;
            console.log(error);
            process.exit(1);
        }
    }
}

new AppBackEnd.Server(3000);

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
require('dotenv').config();

const MongooseDBAccess = require('./MongooseDBAccess');
const RecordFetcher = require('./RecordFetcher');

/**
 * It implements the server class. It initializes objects for schema
 * validation and database connection. Also starts the HTTP server for
 * accepting requests. This class implements the HTTP server related
 * functionality and uses RecordsFetcher class.
 */
class Server {
    async init() {
        this.mongooseDBAccess = new MongooseDBAccess();
        await this.mongooseDBAccess.init();

        this.recordFetcher = new RecordFetcher({ dbAccess: this.mongooseDBAccess });

        this.app = express();
        this.http = require('http').createServer(this.app);

        // use body parse for post data
        this.app.use(bodyParser.json());

        // enable gzip
        this.app.use(compression());

        // register end-point handlers
        this.app.post('/records', this.handleRecordPostRequest.bind(this));

        const serverPort = process.env.PORT || 80;
        this.httpServer = this.http.listen(serverPort, () => console.log(`Record-listing server is listening on port ${serverPort}!`));
    }

    close() {
        this.httpServer.close();
        this.mongooseDBAccess.close();
    }

    async handleRecordPostRequest(req, res) {
        const requestData = {
            "startDate": req.body.startDate,
            "endDate": req.body.endDate,
            "minCount": req.body.minCount,
            "maxCount": req.body.maxCount
        };

        const result = await this.recordFetcher.getRecords(requestData);

        res.status(result.error.httpCode);
        res.send({
            "code": result.error.code,
            "msg": result.error.msg,
            "records": result.records
        });
    }
}

module.exports = Server;

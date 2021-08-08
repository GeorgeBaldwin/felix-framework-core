import 'reflect-metadata';
import  './errorHandler';
import { routingControllersOptions } from "./routingControllerOptions";
import { initSwagger } from "./swagger";
import { useExpressServer } from 'routing-controllers';
const https = require('https');
const { readFileSync } = require('fs');
const httpsOptions = {
    key: readFileSync( __dirname + '/certificates/localhost.pem'),
    cert: readFileSync(__dirname +  '/certificates/localhost.cert')
};

export async function startFelixServer(port:number, axios:any, http2:any){
        let express = require('express'); // or you can import it if you have installed typings
        let app = express(); // your created express server

        useExpressServer(app, routingControllersOptions);
        if(process.env.ENVIRONMENT != "PROD") initSwagger(app);
        
        http2.createServer(httpsOptions, app).listen(port, (error:any) => {
          if (error) {
            console.error(error)
            return process.exit(1)
          } else {
            console.log('Listening on port: ' + port + '.')
          }
        })

        axios.interceptors.request.use(function (config:any) {
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false, // (NOTE: this will disable client verification)
                cert: readFileSync(__dirname + "/certificates/localhost.cert"),
                key: readFileSync(__dirname + "/certificates/localhost.pem")
              })
            config.httpsAgent = httpsAgent;
            return config;
          });
        return app
}

//https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html
//Other Security considerations 
//1-Monitor the event loop
//2-Take precautions against brute-forcing
//3-Use Anti-CSRF tokens
//4-Prevent HTTP Parameter Pollution
//5-https://www.npmjs.com/package/json-sanitizer  ( We want to remove anything with cost)

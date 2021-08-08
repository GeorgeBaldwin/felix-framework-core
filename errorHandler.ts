import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import logger from "./logger";
import { Request } from 'express';

@Middleware({ type: 'after' })
export class errorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: Request, response: any, next: (err: any) => any) {
    
    var responseObj = {
        url : request.originalUrl,
        params : request.params,
        query : request.query,
        ...error!
    };
    console.log(error);
    logger.error("Error Encountered" , responseObj );
    response.send(responseObj!);
  }
}
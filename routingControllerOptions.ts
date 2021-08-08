import { Action } from "routing-controllers";
import jwt from 'jsonwebtoken'
import logger from "./logger";
import { Base64 } from 'js-base64';

/*
var LRU = require("lru-cache")
let cache = new LRU(5000);
*/
export const routingControllersOptions = {
    controllers: [process.cwd() + '\\src\\controllers\\*.ts'],
    //controllers: [UserServiceController,authorizationServiceController,paymentServiceController,customerServiceController,supplierServiceController],
    //routePrefix: '/api',
    defaultErrorHandler: false,
    authorizationChecker: async (action: Action, flags: string[]) => {
      const token:string = action.request.headers['token'];
      const retrievedUser = null; //cache.get(token);

      if(retrievedUser){
        return true;
        return processSecurity(flags,retrievedUser); 
      }else{
        // Load user from redis. 
        // If we are unable to connect to redis, lets verify the token, and reload the users credentials
      
        return true;
        return processSecurity(flags,retrievedUser); 
      }
      
      /*
      const key = process.env.PUBLIC_JWT_KEY;
      const publicKey = Base64.decode(key!);
      let decoded: any;


      // check signature 
      try {
        decoded = jwt.verify(signedToken,publicKey,{ algorithms: ['RS256'] });
      } catch(err) {
        logger.error("Unable to verify signature::", err);
        return false;
      }

      //Check Expiration
      const tokenExpirationDate = decoded?.exp;
      if(!tokenExpirationDate) return false;

      if(Date.now() < new Date(tokenExpirationDate.toString(0)).getMilliseconds() ){
        return false;
      }      
      */

    },
    currentUserChecker: async (action: Action) => {
      const token:string = action.request.headers['authorization'];
      const key = process.env.PUBLIC_JWT_KEY;
      const publicKey = Base64.decode(key!);
      try{
        let  decoded:any = jwt.verify(token,publicKey,{ algorithms: ['RS256'] });
        //const entityManager = getManager(); // you can also get it via getConnection().manager
        //const user = await entityManager.findOne(User, {id:decoded.userId});
        //const account = await entityManager.findOne(UserAccount, {userId:decoded.userId});
        return decoded;
      }catch(err){
        return null;
      }
    }
  }
  function getUserSecurity(userId:string){

  }

  function processSecurity(flags:string[],retrievedUser:any){
    if(flags.length> 0){
      if (!flags.length) return true;
      if ( flags.find(flag => retrievedUser.roles.indexOf(flag) !== -1)) return true;
      return false;
    }else{
      return true;
    }   
  }
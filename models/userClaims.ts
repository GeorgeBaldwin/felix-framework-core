import { Length, IsEmail, IsNumber, IsBoolean, IsDate, IsString } from "class-validator";
import { Base64 } from "js-base64";
import jwt from "jsonwebtoken";

export class UserClaims {
    @IsNumber()
    sub!: number;

    @IsNumber()
    account!: number;

    @Length(6, 100)
    name!: string;

    @IsString()
    userid?: boolean;

    @IsNumber()
    iat?: Number;

    @IsNumber()
    exp?: Number;

    @IsString()
    aud?: string;
    
    @IsEmail()
    email?: string;
    
    @IsEmail()
    emailAddress?: string;

    @IsString()
    bestBuy?: number;

    @IsNumber()
    userId?:number;

    @IsString()
    stripeId?: string

    constructor();
    constructor(token:string, publicKey:string)
    constructor(obj?:any, publicKey?:any){
        if(obj != undefined){
            try{
                let public_key = Base64.decode(publicKey!);
                let user:any = jwt.verify(obj,public_key);
                this.account= user.account;
                this.aud= user.aud;
                this.name= user.name;
                this.email= user.email;
                this.userId = user.id; 
                this.stripeId = user.stripeId; 
            }
            catch(err){
                console.log("Error Decoding User Token", err);
            }
        }
    }
}

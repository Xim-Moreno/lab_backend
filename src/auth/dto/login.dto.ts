import { MinLength } from "class-validator";

export class LoginDto{
    @MinLength(6)
    number:string;
    
    @MinLength(10)
    password:string;
}
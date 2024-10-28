import { IsObject, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterUserDto {
    //@MinLength(6)
    number:string;
    @IsString()
    name:string;
    @IsString()
    lastname:string;
    @IsString()
    birth:string;
    @IsString()
    gender:string;
    @MinLength(10)
    phone:string;
    @MinLength(10)
    password:string;
    @IsOptional()
    @IsString()
    roles?: string;
    @IsOptional()
    @IsString()
    especialidad?: string;
    @IsOptional()
    @IsString()
    cedula?: string;
}

import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
    _id?:string;
    @Prop({unique: true, required:true})
    number: string;
    @Prop({required:true})
    name: string;
    @Prop({required:true})
    lastname: string;
    @Prop({required:true})
    birth: string;
    @Prop({required:true})
    gender: string;
    @Prop({required:true})
    phone: string;
    @Prop({minlength: 10, required:true})
    password?:string;
    @Prop({default:'paciente'})
    roles:string;
    @Prop({required:false})
    especialidad:string;
    @Prop({required:false})
    cedula:string;
}

export const UserSchema = SchemaFactory.createForClass(User);


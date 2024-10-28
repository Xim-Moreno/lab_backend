import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/entities/user.entity';

@Schema()
export class Cita {
    @Prop({required:true})
    patient_id:string;
    @Prop({required:true})
    date: string;
    @Prop({required:true})
    hour: string;
    @Prop({required:true})
    analysis: string;
    @Prop({required:false})
    doctor_id: string;
    @Prop({required:false})
    lab_id: string;
    @Prop({required:true})
    muestra: boolean;
    @Prop({required:false, type: Object})
    data: Record<string, any>;
}

export const CitaSchema = SchemaFactory.createForClass(Cita);
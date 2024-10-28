import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/entities/user.entity';

@Schema()
export class Historial {
    //@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    //patient_id: User['number'];
    @Prop({required:true}) 
    patient_id:string;
    @Prop({required:true})
    date: string;
    @Prop({required:true})
    analysis: string;
    @Prop({required:true})
    doctor_id: string;
    @Prop({required:true})
    lab_id: string;
    @Prop({required:true})
    lab_comision: number;
    @Prop({required:true})
    status: string;
    @Prop({required:true, type: Object})
    data: Record<string, any>;
}

export const HistorialSchema = SchemaFactory.createForClass(Historial);
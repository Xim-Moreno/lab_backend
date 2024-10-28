import * as mongoose from 'mongoose';
export declare class Cita {
    patient_id: string;
    date: string;
    hour: string;
    analysis: string;
    doctor_id: string;
    lab_id: string;
    muestra: boolean;
    data: Record<string, any>;
}
export declare const CitaSchema: mongoose.Schema<Cita, mongoose.Model<Cita, any, any, any, mongoose.Document<unknown, any, Cita> & Cita & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Cita, mongoose.Document<unknown, {}, mongoose.FlatRecord<Cita>> & mongoose.FlatRecord<Cita> & {
    _id: mongoose.Types.ObjectId;
}>;

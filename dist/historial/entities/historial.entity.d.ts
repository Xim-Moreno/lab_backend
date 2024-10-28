import * as mongoose from 'mongoose';
export declare class Historial {
    patient_id: string;
    date: string;
    analysis: string;
    doctor_id: string;
    lab_id: string;
    lab_comision: number;
    status: string;
    data: Record<string, any>;
}
export declare const HistorialSchema: mongoose.Schema<Historial, mongoose.Model<Historial, any, any, any, mongoose.Document<unknown, any, Historial> & Historial & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Historial, mongoose.Document<unknown, {}, mongoose.FlatRecord<Historial>> & mongoose.FlatRecord<Historial> & {
    _id: mongoose.Types.ObjectId;
}>;

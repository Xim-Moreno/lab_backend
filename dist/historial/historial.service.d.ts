import { Model } from 'mongoose';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { Historial } from './entities/historial.entity';
import { User } from 'src/auth/entities/user.entity';
export declare class HistorialService {
    private readonly historialModel;
    private readonly userModel;
    constructor(historialModel: Model<Historial>, userModel: Model<User>);
    create(createHistorialDto: CreateHistorialDto): Promise<Historial>;
    findByPatientId(patient_id: string): Promise<Historial[]>;
    findByDoctorId(doctor_id: string): Promise<Historial[]>;
    findAnalysisSummary(): Promise<any>;
    findAnalysisSummarybyId(lab_id: string): Promise<any>;
    findAnalysisbyId(lab_id: string): Promise<Historial[]>;
    updateData(id: string, data: Record<string, any>, status: string): Promise<Historial>;
}

import { Model } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { Cita } from './entities/cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
export declare class CitaService {
    private readonly citaModel;
    private readonly userModel;
    constructor(citaModel: Model<Cita>, userModel: Model<User>);
    create(createCitaDto: CreateCitaDto): Promise<Cita>;
    findByPatientId(patient_id: string): Promise<Cita[]>;
    findCitas(): Promise<any>;
    remove(id: string): Promise<any>;
    updateMuestra(id: string, muestra: boolean): Promise<Cita>;
}

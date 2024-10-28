import { CitaService } from './cita.service';
import { CreateCitaDto } from './dto/create-cita.dto';
export declare class CitaController {
    private readonly citaService;
    constructor(citaService: CitaService);
    create(createCitaDto: CreateCitaDto): Promise<import("./entities/cita.entity").Cita>;
    findCitaById(id: string): Promise<import("./entities/cita.entity").Cita[]>;
    findCitas(): Promise<any>;
    findMyCitas(req: Request): Promise<import("./entities/cita.entity").Cita[]>;
    remove(id: string): Promise<any>;
    updateMuestra(id: string, muestra: boolean): Promise<import("./entities/cita.entity").Cita>;
}

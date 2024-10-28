import { HistorialService } from './historial.service';
import { CreateHistorialDto } from './dto/create-historial.dto';
export declare class HistorialController {
    private readonly historialService;
    constructor(historialService: HistorialService);
    create(createHistorialDto: CreateHistorialDto): Promise<import("./entities/historial.entity").Historial>;
    findMyHistorial(req: Request): Promise<import("./entities/historial.entity").Historial[]>;
    findCitaById(id: string): Promise<import("./entities/historial.entity").Historial[]>;
    getAnalysisSummary(): Promise<any>;
    getAnalysisSummarybyId(lab_id: string): Promise<any>;
    getAnalysisbyId(lab_id: string): Promise<import("./entities/historial.entity").Historial[]>;
    findHistorialByDoctorId(req: Request): Promise<import("./entities/historial.entity").Historial[]>;
    updateData(id: string, body: {
        data: Record<string, any>;
        status: string;
    }): Promise<import("./entities/historial.entity").Historial>;
}

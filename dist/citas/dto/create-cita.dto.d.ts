import { User } from "src/auth/entities/user.entity";
export declare class CreateCitaDto {
    patient_id: User['number'];
    date: string;
    hour: string;
    analysis: string;
    doctor_id: string;
    lab_id: string;
    muestra: boolean;
    data: Record<string, any>;
}

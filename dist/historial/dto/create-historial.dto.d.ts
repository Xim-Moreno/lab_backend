import { User } from "src/auth/entities/user.entity";
export declare class CreateHistorialDto {
    patient_id: User['number'];
    date: string;
    analysis: string;
    doctor_id: string;
    lab_id: string;
    lab_comision: number;
    status: string;
    data: Record<string, any>;
}

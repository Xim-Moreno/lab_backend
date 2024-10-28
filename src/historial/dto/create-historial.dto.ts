import { IsNumber, IsObject, IsString, isJSON } from "class-validator";
import { User } from "src/auth/entities/user.entity";

export class CreateHistorialDto {
    @IsString()
    patient_id: User['number'];
    @IsString()
    date: string;
    @IsString()
    analysis: string;
    @IsString()
    doctor_id: string;
    @IsString()
    lab_id: string;
    @IsNumber()
    lab_comision: number;
    @IsString()
    status: string;
    @IsObject()
    data: Record<string, any>;
}

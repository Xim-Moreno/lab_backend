import { IsBoolean, IsObject, IsString } from "class-validator";
import { User } from "src/auth/entities/user.entity";

export class CreateCitaDto {
    @IsString()
    patient_id: User['number'];
    @IsString()
    date: string;
    @IsString()
    hour: string;
    @IsString()
    analysis: string;
    @IsString()
    doctor_id: string;
    @IsString()
    lab_id: string;
    @IsBoolean()
    muestra: boolean;
    @IsObject()
    data: Record<string, any>;
}

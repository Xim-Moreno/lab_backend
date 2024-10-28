import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; // Modelo de 'Users'
import { CreateHistorialDto } from './dto/create-historial.dto';
import { Historial } from './entities/historial.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class HistorialService {
  constructor(
    @InjectModel(Historial.name) private readonly historialModel: Model<Historial>,
    @InjectModel(User.name) private readonly userModel: Model<User>,  // Inyecta el modelo de 'Users'
  ) {}

  // Crear un nuevo registro de Historial
  async create(createHistorialDto: CreateHistorialDto): Promise<Historial> {
    // Validar si el pacient_id existe en la colección 'Users'
    const patient = await this.userModel.findOne({ number: createHistorialDto.patient_id }).exec();
    console.log(patient)
    
    // Si el paciente no existe, lanzamos una excepción
    if (!patient) {
      throw new NotFoundException(`Paciente con ID ${createHistorialDto.patient_id} no encontrado.`);
    }

    // Si el paciente existe, procedemos a crear el registro de historial
    const newHistorial = new this.historialModel(createHistorialDto);
    return await newHistorial.save();
  }

  async findByPatientId(patient_id: string): Promise<Historial[]> {
    const historiales = await this.historialModel.find({ patient_id: patient_id }).exec();
    return historiales;
  }

  async findByDoctorId(doctor_id: string): Promise<Historial[]> {
    try {
      return await this.historialModel.find({ doctor_id: doctor_id }); // Asegúrate de que `historialModel` esté definido correctamente
    } catch (error) {
      throw new InternalServerErrorException('Error fetching historial by doctor_id', error.message);
    }
  } 

  async findAnalysisSummary(): Promise<any> {
    try {
        const historiales = await this.historialModel.find().exec();
        
        const analysisCounts = {
            'Hemograma completo': 0,
            'Perfil lipídico': 0,
            'Glucosa en sangre': 0,
            'Examen general de orina': 0,
            'Prueba de embarazo en sangre': 0
        };

        // Recorremos los historiales y contamos según el análisis
        historiales.forEach(historial => {
            const analysis = historial.analysis; // Asegúrate de que este sea el nombre correcto del campo
            if (analysisCounts.hasOwnProperty(analysis)) {
                analysisCounts[analysis] += 1; // Sumar 1 para cada registro del mismo análisis
            }
        });

        return analysisCounts;
    } catch (error) {
        throw new InternalServerErrorException('Error fetching analysis summary', error.message);
    }
  }

  async findAnalysisSummarybyId(lab_id : string): Promise<any> {
    try {
        const historiales = await this.historialModel.find().exec();
        
        const analysisCounts = {
            'Hemograma completo': 0,
            'Perfil lipídico': 0,
            'Glucosa en sangre': 0,
            'Examen general de orina': 0,
            'Prueba de embarazo en sangre': 0
        };

        // Recorremos los historiales y contamos según el análisis
        historiales.forEach(historial => {
            const analysis = historial.analysis; // Asegúrate de que este sea el nombre correcto del campo
            if (analysisCounts.hasOwnProperty(analysis)) {
              if (historial.lab_id == lab_id){
                analysisCounts[analysis] += 1; // Sumar 1 para cada registro del mismo análisis
              } 
            }
        });

        return analysisCounts;
    } catch (error) {
        throw new InternalServerErrorException('Error fetching analysis summary', error.message);
    }
  }

  async findAnalysisbyId(lab_id: string): Promise<Historial[]> {
    try {
      return await this.historialModel.find({ lab_id: lab_id }); // Asegúrate de que `historialModel` esté definido correctamente
    } catch (error) {
      throw new InternalServerErrorException('Error fetching historial by lab_id', error.message);
    }
  } 

  async updateData(id: string, data: Record<string, any>, status: string): Promise<Historial> {
    const historial = await this.historialModel.findById(id);
    if (!historial) {
      throw new NotFoundException(`Historial con ID ${id} no encontrado.`);
    }

    // Actualizar solo el campo 'data'
    historial.data = data;
    historial.status = status;
    return await historial.save();
  }

}

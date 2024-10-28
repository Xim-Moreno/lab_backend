import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; // Modelo de 'Users'

import { User } from 'src/auth/entities/user.entity';
import { Cita } from './entities/cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';

@Injectable()
export class CitaService {
  constructor(
    @InjectModel(Cita.name) private readonly citaModel: Model<Cita>,
    @InjectModel(User.name) private readonly userModel: Model<User>,  // Inyecta el modelo de 'Users'
  ) {}

  // Crear un nuevo registro de cita
  async create(createCitaDto: CreateCitaDto): Promise<Cita> {
    // Validar si el pacient_id existe en la colección 'Users'
    const patient = await this.userModel.findOne({ number: createCitaDto.patient_id }).exec();
    
    // Si el paciente no existe, lanzamos una excepción
    if (!patient) {
      throw new NotFoundException(`Paciente con ID ${createCitaDto.patient_id} no encontrado.`);
    }

    // Si el paciente existe, procedemos a crear el registro de la cita
    const newCita = new this.citaModel(createCitaDto);
    return await newCita.save();
  }

  async findByPatientId(patient_id: string): Promise<Cita[]> {
    const citas = await this.citaModel.find({ patient_id: patient_id }).exec();
    return citas;
  }

  async findCitas(): Promise<any> {
    try {
        const citas = await this.citaModel.find().exec();
        return citas;
    } catch (error) {
        throw new InternalServerErrorException('Error fetching analysis summary', error.message);
    }
  }

  async remove(id: string): Promise<any> {
    const result = await this.citaModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Cita con id ${id} no encontrada`);
    }
    return { message: 'Cita eliminada exitosamente' };  
  }

  async updateMuestra(id: string, muestra: boolean): Promise<Cita> {
    const cita = await this.citaModel.findById(id);
    if (!cita) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada.`);
    }
    cita.muestra = muestra; // Actualizar el campo 'muestra'
    return await cita.save();
  }
}

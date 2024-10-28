import { Controller, Get, Post, Body, UseGuards, Request, Param, Delete, Patch } from '@nestjs/common';

import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CitaService } from './cita.service';
import { CreateCitaDto } from './dto/create-cita.dto';

@Controller('cita')
export class CitaController {
  constructor(private readonly citaService: CitaService) {}

  @Post('/create-cita')
  create(@Body() createCitaDto: CreateCitaDto) {
    return this.citaService.create(createCitaDto);
  }

  @Get('patient-cita/:id') // Permite buscar por ID de paciente
  async findCitaById(@Param('id') id: string) {
    return this.citaService.findByPatientId(id); // Cambia esto si el método de servicio tiene un nombre diferente
  }

  @Get('/citas') 
  async findCitas() {
    return this.citaService.findCitas(); // Cambia esto si el método de servicio tiene un nombre diferente
  }

  @UseGuards(AuthGuard)
  @Get('/my_citas') // Cambia la ruta para obtener el historial del usuario autenticado
  async findMyCitas(@Request() req:Request) {
    const patient_id = req['user'].number; // Asegúrate de que el número del usuario sea el ID del paciente
    return this.citaService.findByPatientId(patient_id);
  }

  @Delete(':id/delete')
  async remove(@Param('id') id: string) {
    return this.citaService.remove(id);
  }

  @Patch(':id/muestra')
  async updateMuestra(@Param('id') id: string, @Body('muestra') muestra: boolean) {
    return this.citaService.updateMuestra(id, muestra);
  }

}

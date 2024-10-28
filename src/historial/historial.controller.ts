import { Controller, Get, Post, Body, UseGuards, Request, Param, Query, Patch } from '@nestjs/common';
import { HistorialService } from './historial.service';
import { CreateHistorialDto } from './dto/create-historial.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('historial')
export class HistorialController {
  constructor(private readonly historialService: HistorialService) {}

  @Post('/create-historial')
  create(@Body() createHistorialDto: CreateHistorialDto) {
    return this.historialService.create(createHistorialDto);
  }

  @UseGuards(AuthGuard)
  @Get('/my-historial') // Cambia la ruta para obtener el historial del usuario autenticado
  async findMyHistorial(@Request() req:Request) {
    const patient_id = req['user'].number; // Asegúrate de que el número del usuario sea el ID del paciente
    return this.historialService.findByPatientId(patient_id);
  }

  @Get('patient-historial/:id') // Permite buscar por ID de paciente
  async findCitaById(@Param('id') id: string) {
    return this.historialService.findByPatientId(id); // Cambia esto si el método de servicio tiene un nombre diferente
  }

  @Get('/analysis-summary')
    async getAnalysisSummary() {
        return this.historialService.findAnalysisSummary();
    }

  @Get('/analysis-summary-lab/:lab_id')
    async getAnalysisSummarybyId(@Param('lab_id') lab_id: string) {
        return this.historialService.findAnalysisSummarybyId(lab_id);
    }

  @Get('/analysis-lab/:lab_id')
    async getAnalysisbyId(@Param('lab_id') lab_id: string) {
        return this.historialService.findAnalysisbyId(lab_id);
    }

  @UseGuards(AuthGuard)
  @Get('doctor-historial') // Nuevo endpoint para buscar historiales por doctor_id
  async findHistorialByDoctorId(@Request() req:Request) {
    const doctor_id=req['user'].number;
    return this.historialService.findByDoctorId(doctor_id);
  }

  @Patch('/update-data/:id') // Nueva ruta para actualizar el campo 'data'
  async updateData(@Param('id') id: string, @Body() body: { data: Record<string, any>; status: string }) {
    return this.historialService.updateData(id, body.data, body.status);
}

}

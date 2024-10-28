import { Controller, Get } from '@nestjs/common';

@Controller('status')  // Ruta /status
export class StatusController {
  @Get()
  getStatus() {
    return { message: 'API is running!' };  // Respuesta para la ruta /status
  }
}

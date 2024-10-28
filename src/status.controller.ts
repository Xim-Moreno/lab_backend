import { Controller, Get } from '@nestjs/common';

@Controller('')  // Ruta /status
export class StatusController {
  @Get()
  getStatus() {
    return { message: 'API is running!' };  // Respuesta para la ruta /status
  }
}

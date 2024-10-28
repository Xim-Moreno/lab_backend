import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from 'src/auth/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Cita, CitaSchema } from './entities/cita.entity';
import { CitaController } from './citas.controller';
import { CitaService } from './cita.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cita.name, schema: CitaSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),  // Importa el modelo 'User' para validaciones
    AuthModule,
  ],
  controllers: [CitaController],
  providers: [CitaService],
})
export class CitaModule {}


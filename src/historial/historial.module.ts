import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorialController } from './historial.controller';
import { HistorialService } from './historial.service';


import { Historial, HistorialSchema } from './entities/historial.entity';
import { User, UserSchema } from 'src/auth/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Historial.name, schema: HistorialSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),  // Importa el modelo 'User' para validaciones
    AuthModule,
  ],
  controllers: [HistorialController],
  providers: [HistorialService],
})
export class HistorialModule {}


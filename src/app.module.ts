import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { HistorialModule } from './historial/historial.module';
import { CitaModule } from './citas/citas.module';
import { StatusController } from './status.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI,{dbName:process.env.MONGO_DB_NAME,}), 
    AuthModule, 
    HistorialModule, 
    CitaModule, 
  ],
  controllers: [StatusController],
  providers: [],
})
export class AppModule {


}

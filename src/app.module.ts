import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Dog, DogSchema } from './model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_DB_URL,
      }),
    }),
    MongooseModule.forFeature([{ name: Dog.name, schema: DogSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

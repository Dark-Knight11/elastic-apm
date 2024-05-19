import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dog } from './model';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Dog.name)
    private readonly dogModel: Model<Dog>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async saveDogs(pageNumber: number) {
    const response = await this.httpService.axiosRef.get(
      `https://dogapi.dog/api/v2/breeds?page[number]=${pageNumber}`,
    );
    const dogs = await this.dogModel.insertMany(
      response.data.data.map((dog) => ({
        id: dog.id,
        name: dog.attributes.name,
        description: dog.attributes.description,
      })),
    );

    return dogs;
  }

  async getDogs() {
    const dogs = await this.dogModel.find().exec();
    return dogs;
  }
}

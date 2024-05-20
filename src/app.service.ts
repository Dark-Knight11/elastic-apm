import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { db } from './db.service';
import { dogs } from 'src/drizzle/migrations/schema';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async saveDogs(pageNumber: number) {
    const response = await this.httpService.axiosRef.get(
      `https://dogapi.dog/api/v2/breeds?page[number]=${pageNumber}`,
    );
    const dogsData = await db.insert(dogs).values(
      response.data.data.map((dog) => ({
        id: dog.id,
        name: dog.attributes.name,
        description: dog.attributes.description,
      })),
    ).returning();

    return dogsData;
  }

  async getDogs() {
    const dogsData = await db.query.dogs.findMany();
    return dogsData;
  }
}

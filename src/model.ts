import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Dog {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const DogSchema = SchemaFactory.createForClass(Dog);


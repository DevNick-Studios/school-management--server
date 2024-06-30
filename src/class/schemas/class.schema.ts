import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IClass } from 'src/shared/interfaces/schema.interface';

@Schema({ timestamps: true })
export class Class implements IClass {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  schoolId: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  EducationalStage,
  IClass,
} from 'src/shared/interfaces/schema.interface';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ timestamps: true })
export class Class implements IClass {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true, enum: Object.values(EducationalStage), type: String })
  stage: EducationalStage;

  @Prop({ required: true })
  level: number;

  @Prop({ required: true })
  schoolId: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
ClassSchema.plugin(mongoosePaginate);

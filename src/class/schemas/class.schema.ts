import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  EducationalStage,
  IClass,
} from 'src/shared/interfaces/schema.interface';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Class implements IClass {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, enum: Object.values(EducationalStage), type: String })
  stage: EducationalStage;

  @Prop({ required: true })
  level: number;

  @Prop({ required: true, type: Types.ObjectId, ref: 'School' })
  school: string | Types.ObjectId;
}

export const ClassSchema = SchemaFactory.createForClass(Class);

ClassSchema.index({ school: 1 });
ClassSchema.index({ title: 1, school: 1 }, { unique: true });

ClassSchema.plugin(mongoosePaginate);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ISubject } from 'src/shared/interfaces/schema.interface';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Subject implements ISubject {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'School' })
  school: string | Types.ObjectId;

  // @Prop({ required: true })
  // teacher: string;

  // @Prop({ required: true })
  // class: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
SubjectSchema.plugin(mongoosePaginate);

SubjectSchema.index({ school: 1 });
SubjectSchema.index({ school: 1, title: 1 }, { unique: true });

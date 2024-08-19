import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { IAcademicYear } from 'src/shared/interfaces/schema.interface';

export type AcademicYearDocument = HydratedDocument<AcademicYear>;

@Schema({ timestamps: true })
export class AcademicYear implements IAcademicYear {
  @Prop({ required: true })
  startYear: number;

  @Prop({ required: true })
  endYear: number;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ required: true, type: Types.ObjectId, ref: 'School' })
  school: string | Types.ObjectId;
}

export const AcademicYearSchema = SchemaFactory.createForClass(AcademicYear);

AcademicYearSchema.plugin(mongoosePaginate);

AcademicYearSchema.index({ school: 1 });
AcademicYearSchema.index({ school: 1, isActive: 1 });
AcademicYearSchema.index({ school: 1, startYear: 1 }, { unique: true });

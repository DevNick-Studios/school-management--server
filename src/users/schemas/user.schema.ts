import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IUser, AccountTypeEnum } from 'src/shared/interfaces/schema.interface';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { School } from 'src/schools/schemas/school.schema';
import { Teacher } from 'src/teachers/schemas/teacher.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User implements IUser {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: String, enum: AccountTypeEnum })
  role: AccountTypeEnum;

  @Prop({ type: Types.ObjectId, refPath: 'role' })
  account: string | Types.ObjectId | Teacher | School;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongoosePaginate);

UserSchema.index({ email: 1 });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IUser, AccountTypeEnum } from 'src/shared/interfaces/schema.interface';

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
  account: string | Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 });

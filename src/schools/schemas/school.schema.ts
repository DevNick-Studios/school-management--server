import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CreateSchoolDto } from '../dto/create-school.dto';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User implements CreateSchoolDto {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'Manager', enum: ['Manager', 'Owner'] })
  role?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

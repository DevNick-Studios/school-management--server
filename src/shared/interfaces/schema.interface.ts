import { Types } from 'mongoose';

export enum EducationalStage {
  Nursery = 'Nursery',
  Primary = 'Primary',
  Secondary = 'Secondary',
}

export enum AccountTypeEnum {
  school = 'School',
  teacher = 'Teacher',
  manager = 'Manager',
}

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface ISchool {
  name: string;
  inceptionDate?: string;
  location?: string;
  owner?: string | Types.ObjectId;
}

export interface IClass {
  schoolId: string;
  title: string;
  stage: EducationalStage;
  level: number;
}

export interface ITeacher {
  schoolId: string;
  name: string;
  gender?: GenderEnum;
  email: string;
  password: string;
}

export interface IStudent {
  schoolId: string;
  name: string;
  age: number;
  gender: GenderEnum;
  class: Types.ObjectId;
  previousClasses?: Types.ObjectId[];
  email?: string;
  password?: string;
}

export interface ISubject {
  classId: string;
  teacherId: string;
  name: string;
}

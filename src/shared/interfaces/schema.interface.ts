import { Request } from 'express';
import { Types } from 'mongoose';

export interface Base {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

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

export enum TermEnum {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
}

export interface IAuthPayload {
  id: string | Types.ObjectId;
  role: string;
  email: string;
  accountId: string;
  school: string;
  academicYear: string;
}

export interface IAuthRequest extends Request {
  user: IAuthPayload;
}

export interface IUser extends Base {
  name: string;
  email: string;
  password: string;
  role?: AccountTypeEnum;
  account?: string | Types.ObjectId | ITeacher | ISchool;
}

export interface ISchool extends Base {
  name: string;
  inceptionDate?: string;
  location?: string;
  owner?: string | Types.ObjectId;
}

export interface IClass extends Base {
  school: string | Types.ObjectId;
  formTeacher: string | Types.ObjectId;
  title: string;
  stage: EducationalStage;
  level: number;
}

export interface ITeacher extends Base {
  school: string | Types.ObjectId;
  name: string;
  gender?: GenderEnum;
  email: string;
  password: string;
}

export interface IStudent extends Base {
  school: string | Types.ObjectId;
  name: string;
  age: number;
  gender: GenderEnum;
  currentClass?: Types.ObjectId;
  // previousClasses?: Types.ObjectId[];
  email?: string;
  password?: string;
}

export interface IScore extends Base {
  classStudent: string | Types.ObjectId;
  classSubject: string | Types.ObjectId;
  academicYear: string | Types.ObjectId;
  term: string;
  CA: number;
  exam: number;
  total: number;
  remark?: string;
}

export interface IAcademicYear extends Base {
  school: string | Types.ObjectId;
  startYear: number;
  endYear: number;
  isActive: boolean;
}

export interface ISubject extends Base {
  title: string;
  school: string | Types.ObjectId;
}

export interface IClassSubject extends Base {
  subject: string;
  class: string;
  teacher: string;
}

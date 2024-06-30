export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface ISchool {
  name: string;
  inceptionDate: string;
  location: string;
}

export interface IClass {
  schoolId: string;
  title: string;
}

export interface ITeacher {
  schoolId: string;
  name: string;
  email: string;
  password: string;
}

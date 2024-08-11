export class CreateClassSubjectsDto {
  readonly class: string;
  readonly subject: string;
  readonly teacher: string;
}

export class CreateClassStudentsDto {
  readonly class: string;
  readonly student: string;
  readonly academicYear: string;
}

export class CreateClassTeachersDto {
  readonly class: string;
  readonly teacher: string;
}

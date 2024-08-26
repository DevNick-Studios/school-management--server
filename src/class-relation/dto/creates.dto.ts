export class CreateClassSubjectDto {
  readonly class: string;
  readonly subject: string;
  readonly teacher: string;
}

export class CreateClassStudentDto {
  readonly class: string;
  readonly student: string;
  readonly academicYear: string;
}

export class CreateClassTeacherDto {
  readonly class: string;
  readonly teacher: string;
}

export interface GetScoresQuery {
  term: string;
  academicYear: string;
  page: number;
  limit?: number;
}

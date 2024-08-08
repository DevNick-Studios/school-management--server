import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from 'src/shared/interfaces/schema.interface';

type UserRecord = keyof IUser;
export const CurrentUser = createParamDecorator(
  (data: UserRecord, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return data ? request.currentUser?.[data] : request.user;
  },
);

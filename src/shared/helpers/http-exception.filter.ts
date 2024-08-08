import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const values =
      exception instanceof HttpException
        ? {
            statusCode: exception.getStatus(),
            message:
              exception.getResponse() instanceof String
                ? exception.getResponse()
                : (exception.getResponse() as { message: string[] })
                    ?.message?.[0],
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: (exception as any)?.message || 'A new error Occured',
          };

    // console.log({ values: values.message, exception });

    const responseBody = {
      statusCode: values.statusCode,
      message: values.message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    console.log({ responseBody });

    httpAdapter.reply(ctx.getResponse(), responseBody, values.statusCode);
  }
}

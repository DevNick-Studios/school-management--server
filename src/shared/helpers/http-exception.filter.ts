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

    // console.error(
    //   `Error processing request for ${ctx.getRequest().method} ${ctx.getRequest().url}, Message: ${exception['message']}, Stack: ${exception['stack']}`,
    // );

    const errorMessage = (exception as { message: string }).message;

    const responseObj =
      exception instanceof HttpException
        ? {
            statusCode: exception.getStatus(),
            message:
              exception.getResponse() instanceof String
                ? exception.getResponse()
                : (exception.getResponse() as { message: string })?.message,
          }
        : {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: errorMessage || 'A new error Occured',
          };

    const isDuplicateError = errorMessage.includes(
      'E11000 duplicate key error',
    );
    if (isDuplicateError) {
      const duplicateKeyRegex = /dup key:\s+({.*})/;

      const match = errorMessage.match(duplicateKeyRegex);

      if (match && match[1]) {
        const jsonString = match[1]
          .replace(/'/g, '"') // Ensure keys and responseObj are in double quotes
          .replace(/(\w+):/g, '"$1":'); // Add double quotes around keys if missing

        try {
          const parsedObject = JSON.parse(jsonString);

          const fields = Object.keys(parsedObject);
          responseObj.message = `${fields.join(' and ')} must be unique. Fields already exists, use another value`;
        } catch (error) {
          console.error('Failed to parse JSON:', error);
        }
      } else {
        console.log('Duplicate Key not found', match);
      }
    }

    const responseBody = {
      statusCode: responseObj.statusCode,
      message: responseObj.message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, responseObj.statusCode);
  }
}

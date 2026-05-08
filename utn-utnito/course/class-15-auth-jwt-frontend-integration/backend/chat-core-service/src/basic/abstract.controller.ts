import { ResponseBuilder } from './response-builder';
import { ResponseObject } from './response-object.model';

export abstract class AbstractController {
  protected createOkResponse<T>(data: T): ResponseObject<T> {
    return new ResponseBuilder().buildOkResponse(data);
  }

  protected createOkResponseWithMessage<T>(data: T, message: string): ResponseObject<T> {
    return new ResponseBuilder().buildOkResponse(data, message);
  }

  protected createErrorResponse(message: string, messageCode = '4000'): ResponseObject<null> {
    return new ResponseBuilder().buildErrorResponse(message, messageCode);
  }
}

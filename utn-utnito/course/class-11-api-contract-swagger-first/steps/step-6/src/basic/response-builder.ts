import { ResponseObject } from './response-object.model';
import { ResponseMessage } from './response-message.model';

export class ResponseBuilder {
  buildOkResponse<T>(data: T, message = 'OK'): ResponseObject<T> {
    return new ResponseObject(
      true,
      new ResponseMessage('0000', message),
      new Date().toISOString(),
      data,
    );
  }

  buildErrorResponse(message: string, messageCode = '4000'): ResponseObject<null> {
    return new ResponseObject(
      false,
      new ResponseMessage(messageCode, message),
      new Date().toISOString(),
      null,
    );
  }
}

import { ResponseMessage } from './response-message.interface';

export interface ResponseObject<T> {
  serverTime: string;
  success: boolean;
  responseMessage: ResponseMessage;
  data: T;
}

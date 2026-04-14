import { DemoResponseMessage } from './demo-response-message.interface';

export interface DemoResponseObject<T> {
  serverTime: string;
  success: boolean;
  responseMessage: DemoResponseMessage;
  data: T;
}

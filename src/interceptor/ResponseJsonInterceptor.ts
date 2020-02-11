import { InterceptorInterface, Action } from 'routing-controllers';

interface ResultObject {
  result: boolean;
  content: object;
}

export class ResponseJosnInterceptor implements InterceptorInterface {
  intercept(_: Action, content: object) {
    const resultObject: Partial<ResultObject> = {};
    resultObject.result = true;
    resultObject.content = content;
    return resultObject;
  }
}

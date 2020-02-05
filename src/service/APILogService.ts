import { BaseService } from './BaseService';
import { APILog, User } from '../model';
import { Service } from 'typedi';
import { Method } from '../model/Enum';

export interface IApiLog {
  user: User;
  url: string;
  method: Method;
  log?: string;
  responseTime: number;
}

@Service()
export class ApiLogService extends BaseService<APILog> {
  constructor() {
    super(APILog);
  }

  public async save(apiLog: IApiLog): Promise<APILog> {
    return this.genericRepository.save({
      user: apiLog.user,
      log: apiLog?.log,
      responseTime: apiLog.responseTime,
      method: apiLog.method,
      url: apiLog.url,
    });
  }
}

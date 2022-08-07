import axios, {
  Axios,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CanceledError,
} from 'axios';

type AppErrorCode = 'CANCELLED' | 'UNKNOWN' | 'API'; // ...
interface AppError {
  code: AppErrorCode;
  message: string;
}

class AppErrors {
  static readonly CancelledError: AppError = {
    code: 'CANCELLED',
    message: '*don`t show me',
  };
  static readonly UnknownError: AppError = {
    code: 'UNKNOWN',
    message: 'Unknown error',
  };
  static ApiError(message: string): AppError {
    return { code: 'API', message };
  }
  // ...
}

// notify.failed(e: AppError) {
//  if (e.code !== 'CANCELLED') ...
//}

abstract class BaseApi {
  private readonly client: Axios;

  constructor(private readonly abortController: AbortController) {
    this.client = axios.create({
      signal: this.abortController.signal,
    });
  }

  protected async request<T>(
    config: AxiosRequestConfig<T>
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.client.request<T>(config);
    } catch (e) {
      if (e instanceof CanceledError) {
        throw AppErrors.CancelledError;
      }
      // ...
      // TODO
      else if (e instanceof AxiosError) throw AppErrors.ApiError(e.message);
      else throw AppErrors.UnknownError;
    }
  }
}

export default BaseApi;

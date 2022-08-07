import BaseApi from './BaseApi';

export interface TestApi {
  getPosts: () => Promise<any[]>;
  getUsers: () => Promise<any[]>;
  getPhotos: () => Promise<any[]>;
}

class TestApiImpl extends BaseApi implements TestApi {
  constructor(abortController: AbortController) {
    super(abortController);
  }

  async getPosts(): Promise<any[]> {
    const response = await this.request<any[]>({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts',
    });
    return response.data;
  }

  async getUsers(): Promise<any[]> {
    const response = await this.request<any[]>({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/users',
    });
    return response.data;
  }

  async getPhotos(): Promise<any[]> {
    const response = await this.request<any[]>({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/photos',
    });
    return response.data;
  }
}

export default TestApiImpl;

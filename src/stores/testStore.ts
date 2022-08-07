import TestApi from '@/api/TestApi';
import { defineStore } from 'pinia';

// interface TestState {
//   message: string;
//   finished: boolean;
// }

export const useTestStore = defineStore('main', {
  actions: {
    load() {
      this.apiV1((controller) => new TestApi(controller))
        .getPosts()
        .catch(console.log);

      this.apiV2(TestApi).getUsers().catch(console.log);
    },
  },
});

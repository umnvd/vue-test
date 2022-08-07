import BaseApi from '@/api/BaseApi';
import { PiniaPluginContext } from 'pinia';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    _abortController: AbortController;
    apiV1: <T extends BaseApi>(
      creator: (controller: AbortController) => T
    ) => T;
    apiV2: <T extends BaseApi>(
      constructor: new (abortController: AbortController) => T
    ) => T;
    cancel: () => void;
  }
}

export default function cancelRequestsPlugin(context: PiniaPluginContext) {
  const controller = new AbortController();
  context.store._abortController = controller;
  context.store.apiV1 = (creator) => creator(controller);
  context.store.apiV2 = (constructor) => new constructor(controller);
  context.store.cancel = () => controller.abort();
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const withMiddlewares =
  (...middlewares: Array<(handler: any) => any>) =>
  (handler: any) =>
    middlewares.reduceRight((acc, middleware) => middleware(acc), handler);


export type FetchResult<R> = {
  type: 'success';
  result: R;
} | {
  type: 'error';
  message: string;
};

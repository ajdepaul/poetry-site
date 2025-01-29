
export type FetchResult<C> = {
  type: 'success';
  content: C;
} | {
  type: 'error';
  message: string;
};

export interface FormResult<E> {
  errors?: E
  message?: string
}

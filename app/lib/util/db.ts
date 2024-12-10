
export interface FetchResult<C> {
  content?: C,
  errorMsg?: 'Database error' | 'Not found',
}

export interface FormResult<E> {
  errors?: E
  message?: string
}

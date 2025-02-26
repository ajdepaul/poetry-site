
export type ActionResult<R> = {
  type: 'success';
  result: R;
} | {
  type: 'error';
  message: string;
};

export type Action<A, R> = (args: A) => ActionResult<R> | Promise<ActionResult<R>>;

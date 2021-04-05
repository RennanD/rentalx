class AppError {
  public readonly message: string;
  public readonly status_code: number;
  public readonly type_error:
    | 'bad_request'
    | 'auth_error'
    | 'expired_token'
    | 'server_error';

  constructor(
    message: string,
    status_code = 400,
    type_error:
      | 'bad_request'
      | 'auth_error'
      | 'expired_token'
      | 'server_error' = 'bad_request'
  ) {
    this.message = message;
    this.status_code = status_code;
    this.type_error = type_error;
  }
}

export { AppError };

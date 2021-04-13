class UnauthorizedError {
  public readonly message: string;
  public readonly status_code: number;
  public readonly type_error: 'auth_error' | 'expired_token';

  constructor(
    message: string,
    type_error: 'auth_error' | 'expired_token' = 'auth_error'
  ) {
    this.message = message;
    this.status_code = 401;
    this.type_error = type_error;
  }
}

export { UnauthorizedError };

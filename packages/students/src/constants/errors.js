export class AuthError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'AuthError';
  }
}

export class UserNotFoundError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'AuthError';
  }
}

export class ServerError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'ServerError';
  }
}

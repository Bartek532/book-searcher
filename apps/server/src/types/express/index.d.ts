declare namespace Express {
  interface Request {
    authToken?: Token;
    user?: {
      id: number;
      name: string;
      email: string;
      password: string;
    };
  }
}

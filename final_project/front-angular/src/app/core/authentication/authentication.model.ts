export class AuthenticationToken {
  token: string;
  email: string;
  name: number;

  constructor(token) {
    this.token = token.token;
    this.email = token.email;
    this.name = token.name;
  }
}

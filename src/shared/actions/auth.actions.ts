export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { USERNAME: string; PASSWORD: string }) {}
}
export class Logout {
  static readonly type = '[Auth] Logout';
}
export interface ILogin{
  email: string;
  password: string;
}

export interface IVerifyEmail {
  email: string;
  oneTimeCode: number;
}
export interface IResetPassword {
  email: string;
  newPassword: string;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}

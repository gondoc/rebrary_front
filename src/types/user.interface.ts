import { TErrorMsg, TUser } from "./user.types.ts";

export interface IUserData {
  userId: string;
  userPw: string;
  userEmail: string;
  userNick: string;
  userRole: TUser;
}

export interface IJoinPayload {
  userId: string;
  userPw: string;
  userPwConfirm: string;
  userEmail: string;
  userNick: string;
}

export interface IJoinValid {
  id: IValid;
  pw: IValid;
  pwConfirm: IValid;
  email: IValid;
  nick: IValid;
}

export interface IValid {
  isValid: boolean;
  errorMsg?: TErrorMsg;
}

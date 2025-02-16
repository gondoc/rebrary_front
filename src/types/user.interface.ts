import { TErrorMsg, TUser } from "./user.types.ts";

export interface IUserData {
  userEmail: string;
  userPw: string;
  userNick: string;
  userRole: TUser;
}

export interface IJoinPayload {
  userEmail: string;
  userPw: string;
  userPwConfirm: string;
  userNick: string;
}

export interface IJoinValid {
  topPhase: number;
  phase: number;
  email: IValid;
  pw: IValid;
  pwConfirm: IValid;
  emailVerify: IValid;
  nick: IValid;
}

export interface IValid {
  isValid: boolean;
  errorMsg?: TErrorMsg;
  time?: number;
}

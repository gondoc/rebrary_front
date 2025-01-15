import { IJoinPayload } from "../types/user.interface.ts";

export const INIT_JOIN_PAYLOAD: IJoinPayload = {
  userId: "",
  userPw: "",
  userPwConfirm: "",
  userEmail: "",
  userNick: "",
};

export const INIT_VALID = {
  isValid: false,
};

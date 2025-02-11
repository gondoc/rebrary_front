// export const isDev = process.env.NODE_ENV !== 'production';
export const isDev = process.env.NODE_ENV === "development";

const context = "rebrary";

export const apiUrl = isDev
  ? `http://${window.location.hostname}:8080/${context}/api`
  : `http://${window.location.host}/${context}/api`;

export const API = {
  USER: {
    INFO: `${apiUrl}/user/signUp`,
    ID_CHECK: `${apiUrl}/user/checkId/{id}`,
    NICK_CHECK: `${apiUrl}/user/checkNick/{nick}`,
    SEND_CODE: `${apiUrl}/user/reqCd`,
    VERIFY_CODE: `${apiUrl}/user/verifyCd`,
    NICK: `${apiUrl}/user/nick`,
  },
};

import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { QueryKeys } from "./queryKeys.ts";
import { IResponse } from "../types/common.interface.ts";
import { API } from "../config/urls.ts";
import { IUserData, IJoinPayload } from "../types/user.interface.ts";

// 로그인
export const useUserInfoMutation = (
  param: string,
): UseQueryResult<AxiosResponse<IResponse<IUserData>>, AxiosError> => {
  return useQuery({
    queryKey: [QueryKeys.member.info, param],
    queryFn: () => axios.post(API.USER.INFO),
    enabled: false,
  });
};

// id-check
export const useUserEmailDupCheck = (
  param: string,
): UseQueryResult<AxiosResponse<IResponse<boolean>>, AxiosError> => {
  return useQuery({
    queryKey: [QueryKeys.member.idCheck(param)],
    queryFn: () => axios.get(API.USER.ID_CHECK.replace(`{id}`, param)),
    enabled: false,
    retry: false,
  });
};

// nick-check
export const useUserNickDupCheck = (param: string): boolean => {
  const { data } = useQuery({
    queryKey: [QueryKeys.member.nickCheck(param)],
    queryFn: () => axios.get(API.USER.NICK_CHECK.replace(`{nick}`, param)),
    enabled: param !== "",
  });

  return data && data?.data?.data;
};

// // nick-check
// export const useUserNickDupCheck = (
//   param: string,
// ): UseQueryResult<AxiosResponse<IResponse<boolean>>, AxiosError> => {
//   return useQuery({
//     queryKey: [QueryKeys.member.nickCheck(param)],
//     queryFn: () => axios.get(API.USER.NICK_CHECK.replace(`{nick}`, param)),
//     enabled: param !== "",
//   });
// };

// 이메일 인증 코드 발송 요청
export const useSendEmailCode = (
  email: string,
): UseQueryResult<AxiosResponse<IResponse<boolean>>, AxiosError> => {
  return useQuery({
    queryKey: [QueryKeys.member.email.codeSend(email)],
    queryFn: () =>
      axios.post(API.USER.SEND_CODE, {
        email: email,
      }),
    enabled: false,
    retry: false,
    gcTime: 1000 * 60 * 5,
  });
};

// 이메일 인증 코드 검증 요청
export const useVerifyEmailCodeMutation = (
  successHandler: (res: boolean) => void,
  failHandler: () => void,
): UseMutationResult<
  boolean,
  AxiosError,
  { code: string; email: string },
  unknown
> =>
  useMutation<boolean, AxiosError, { code: string; email: string }>({
    mutationFn: (param: { code: string; email: string }) =>
      axios
        .post(API.USER.VERIFY_CODE, {
          email: param.email,
          code: param.code,
        })
        .then((res) => {
          console.log("useVerifyEmailCodeMutation res ", res);
          return res.data.data;
        }),

    onSuccess: (res) => {
      console.log("useVerifyEmailCodeMutation onSuccess  res \n", res);
      successHandler(res);
    },

    onError: (res) => {
      console.log("useVerifyEmailCodeMutation onError  res \n", res);
      failHandler();
    },
  });

// 닉네임 요청
export const useUserNickQuery = (): UseQueryResult<string, AxiosError> => {
  return useQuery({
    queryKey: QueryKeys.member.nick,
    queryFn: () =>
      axios
        .get<IResponse<string>>(API.USER.NICK)
        .then(({ data }) => data?.data)
        .catch((err) => console.error("err ", err)),
  });
};

// 회원가입
export const useUserJoinMutation = (
  successHandler: () => void,
  failHandler: () => void,
): UseMutationResult<void, AxiosError, IJoinPayload, unknown> =>
  useMutation<void, AxiosError, IJoinPayload>({
    mutationFn: (param: IJoinPayload) =>
      axios
        .post(API.USER.INFO, {
          // userId: param.userId,
          email: param.userEmail,
          password: param.userPw,
          nickName: param.userNick,
        })
        .then((res) => {
          console.log("useUserJoinMutation res ", res);
          return res.data.data;
        }),

    onSuccess: (res) => {
      console.log("useUserJoinMutation onSuccess  res \n", res);
      successHandler();
    },

    onError: (res) => {
      console.log("useUserJoinMutation onError  res \n", res);
      failHandler();
    },
  });

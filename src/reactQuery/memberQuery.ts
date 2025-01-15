// 차번 cctv 삭제시 사용함.
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
    queryKey: [QueryKeys.member.info(), param],
    queryFn: () => axios.post(API.USER.INFO),
    enabled: false,
  });
};

// id-check
export const useUserIdCheck = (
  param: string,
): UseQueryResult<AxiosResponse<IResponse<boolean>>, AxiosError> => {
  return useQuery({
    queryKey: [QueryKeys.member.id(param), param],
    queryFn: () => axios.get(API.USER.ID_CHECK.replace(`{id}`, param)),
    enabled: false,
    retry: false,
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
          userId: param.userId,
          password: param.userPw,
          email: param.userEmail,
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

// export const useVhclCctvRegMutation = (successHandler: () => void, failHandler: () => void): UseMutationResult<void, AxiosError, IVhclCctvApiPayload, unknown> => useMutation<void, AxiosError, IVhclCctvApiPayload>({
//     mutationFn: (param: IVhclCctvApiPayload) => axios.post(API.VEHICLE.CCTV.REG, null, {
//         params: {...param}
//     }).then(res => {
//         console.log("useVhclCctvRegQuery res ", res);
//         return res.data.data
//     }),
//
//     onSuccess: (res) => {
//         console.log("useVhclCctvRegQuery onSuccess  res \n", res)
//         successHandler()
//     },
//
//     onError: (res) => {
//         console.log("useVhclCctvRegQuery onError  res \n", res)
//         failHandler()
//     }
// })

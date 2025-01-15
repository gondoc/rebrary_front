import { create } from "zustand";
import { IJoinPayload, IJoinValid } from "../types/user.interface.ts";
import { INIT_JOIN_PAYLOAD, INIT_VALID } from "../const/join.const.ts";
// import {IApiPayload, IDBPayload, IEventPayload, ILink, ILinkHistState, ILinkPopup, ITelnetPayload, IValidStatus} from '@/types/app/linkType.ts';
// import dayjs from 'dayjs';
// import {DEFAULT_DAY_JS_FORMAT} from '@/config/join.const.ts';

// export const INIT_POPUP_DB_PAYLOAD: IDBPayload = {type: '', sid: '', ip: '', port: 0, id: '', password: ''};
// export const INIT_POPUP_TELNET_PAYLOAD: ITelnetPayload = {address: '', port: 0};
// export const INIT_POPUP_API_PAYLOAD: IApiPayload = {address: ''};
// export const INIT_POPUP_EVENT_PAYLOAD: IEventPayload = {svcThemeCd: ''};
// export const INIT_POPUP_STATUS: ILinkPopup = {
//     isOpen: false,
//     mode: 'insert',
//     systemName: '',
//     systemCheckType: 'db', // 첫번째 기본값으로서 'db' 아이템 활성화
//     systemCheckPeriodValue: 10,
//     systemCheckPeriodType: 'm',
//     systemCheckTarget: '',
//     systemCheckAuthId: '',
//     systemCheckAuthPw: '',
//     dbPayload: {},
//     telnet: {},
//     api: {},
//     event: {},
// };

interface IUserStore {
  // 현재 active 된 단일 노드 정보
  joinPayload: IJoinPayload;
  setJoinPayload: (arg: IJoinPayload) => void;

  // 현재 active 된 단일 노드 정보
  joinValid: IJoinValid;
  setJoinValid: (arg: IJoinValid) => void;

  // // 조회된 연계 현황 에러 이력
  // linkHist: ILinkHistState;
  // setLinkHist: (arg: ILinkHistState) => void;
  //
  // // 연계 현황 정보
  // linkList: {data: ILink[], updateDtm: string};
  // setLinkList: (arg: ILink[]) => void;
  //
  // // 팝업 상태
  // linkPopup: ILinkPopup;
  // setLinkPopup: (arg: ILinkPopup) => void;
  //
  // // 검증상태
  // validStatus: IValidStatus;
  // setValidStatus: (arg: IValidStatus) => void;
  //
  // // period type
  // typeStatus: {isOpen: boolean, value: string};
  // setTypeStatus: (arg: {isOpen: boolean, value: string}) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  // 현재 active 된 단일 노드 정보
  joinPayload: INIT_JOIN_PAYLOAD,
  setJoinPayload: (arg: IJoinPayload) => set(() => ({ joinPayload: arg })),

  // 회원가입 payload 검증 상태
  joinValid: {
    id: INIT_VALID,
    pw: INIT_VALID,
    pwConfirm: INIT_VALID,
    email: INIT_VALID,
    nick: INIT_VALID,
  },
  setJoinValid: (arg: IJoinValid) => set(() => ({ joinValid: arg })),

  // // 조회된 연계 현황 에러 이력
  // linkHist: { isOpen: false, items: [] },
  // setLinkHist: (arg: ILinkHistState) => set(() => ({ linkHist: arg })),
  //
  // // 연계 현황 정보
  // linkList: { data: [], updateDtm: dayjs().format(DEFAULT_DAY_JS_FORMAT) },
  // setLinkList: (arg: ILink[]) =>
  //   set(() => ({
  //     linkList: { data: arg, updateDtm: dayjs().format(DEFAULT_DAY_JS_FORMAT) },
  //   })),
  //
  // // 팝업 상태
  // linkPopup: INIT_POPUP_STATUS,
  // setLinkPopup: (arg: ILinkPopup) => set(() => ({ linkPopup: arg })),
  //
  // // 검증상태
  // validStatus: { isValid: false, isError: false, mode: "insert" },
  // setValidStatus: (arg: IValidStatus) => set(() => ({ validStatus: arg })),
  //
  // typeStatus: { isOpen: false, value: "분" },
  // setTypeStatus: (arg: { isOpen: boolean; value: string }) => ({
  //   typeStatus: { isOpen: arg.isOpen, value: arg.value },
  // }),
}));

export default useUserStore;

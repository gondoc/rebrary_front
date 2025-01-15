import JoinRowInput from "@/components/join/JoinRowInput.tsx";
import useUserStore from "@/store/userStore.ts";
import { useEffect } from "react";
import { IValid } from "@/types/user.interface.ts";
import { isEqual } from "@/util/commonUtil.ts";

const UserPwConfirmArea = () => {
  const { joinPayload, setJoinPayload, joinValid, setJoinValid } =
    useUserStore();

  useEffect(() => {
    if (joinPayload.userPw && joinPayload.userPwConfirm) {
      if (
        validationUserPwConfirm(joinPayload.userPw, joinPayload.userPwConfirm)
      ) {
        setJoinValid({
          ...joinValid,
          pwConfirm: { isValid: true },
        });
      } else {
        const payload: IValid = { isValid: false };
        setJoinValid({
          ...joinValid,
          pwConfirm: { ...payload, errorMsg: "비밀번호가 일치하지 않습니다." },
        });
      }
    }
  }, [joinPayload.userPw, joinPayload.userPwConfirm]);

  const validationUserPwConfirm = (
    userPw: string,
    userPwConfirm: string,
  ): boolean => {
    return isEqual(userPw, userPwConfirm);
  };

  return (
    <JoinRowInput
      label={"비밀번호 확인"}
      className={"password-wrapper"}
      type={"password"}
      placeholder={"비밀번호 확인"}
      required={true}
      errorMsg={
        joinValid.pwConfirm.errorMsg !== "" && joinValid.pwConfirm?.errorMsg
          ? joinValid.pwConfirm.errorMsg
          : ""
      }
      setPayload={(payloadValue) =>
        setJoinPayload({ ...joinPayload, userPwConfirm: payloadValue })
      }
    />
  );
};

export default UserPwConfirmArea;

import JoinRowInput from "@/components/join/JoinRowInput.tsx";
import useUserStore from "@/store/userStore.ts";
import { useEffect } from "react";
import { IValid } from "@/types/user.interface.ts";

const UserNickArea = () => {
  const { joinPayload, setJoinPayload, joinValid, setJoinValid } =
    useUserStore();

  useEffect(() => {
    if (joinPayload.userNick) {
      if (validationUserNickConfirm(joinPayload.userNick)) {
        setJoinValid({
          ...joinValid,
          nick: { isValid: true },
        });
      } else {
        const payload: IValid = { isValid: false };
        setJoinValid({
          ...joinValid,
          nick: { ...payload, errorMsg: "2글자 이상 10글자 이내 여야 합니다." },
        });
      }
    }
  }, [joinPayload.userNick]);

  const validationUserNickConfirm = (userNick: string): boolean => {
    const lengthPattern = /^.{2,10}$/;
    return lengthPattern.test(userNick);
  };

  return (
    <JoinRowInput
      label={"닉네임"}
      type={"text"}
      placeholder={"별명 2~10자"}
      required={true}
      errorMsg={
        joinValid.nick.errorMsg !== "" && joinValid.nick?.errorMsg
          ? joinValid.nick.errorMsg
          : ""
      }
      setPayload={(payloadValue) =>
        setJoinPayload({ ...joinPayload, userNick: payloadValue })
      }
    />
  );
};
export default UserNickArea;

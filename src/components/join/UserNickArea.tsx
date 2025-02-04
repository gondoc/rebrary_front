import JoinRowInput from "@/components/join/common/JoinRowInput.tsx";
import useUserStore from "@/store/userStore.ts";
import { useEffect, useMemo } from "react";

const UserNickArea = () => {
  const { joinPayload, setJoinPayload, joinValid, setJoinValid } =
    useUserStore();

  useEffect(() => {
    if (joinPayload.userNick) {
      if (validUserNick) {
        setJoinValid({
          ...joinValid,
          nick: { isValid: true },
        });
      } else {
        setJoinValid({
          ...joinValid,
          nick: {
            isValid: false,
            errorMsg: "5글자 이상 15글자 이내 여야 합니다.",
          },
        });
      }
    }
  }, [joinPayload.userNick]);

  const validationUserNickConfirm = (userNick: string): boolean => {
    const lengthPattern = /^.{5,15}$/;
    return lengthPattern.test(userNick);
  };

  const validUserNick: boolean = useMemo(() => {
    return validationUserNickConfirm(joinPayload.userNick);
  }, [joinPayload.userNick]);

  return (
    <JoinRowInput
      key={`JOIN_ROW_INPUT_USER_NICK_${joinPayload.userNick}`}
      label={"닉네임"}
      type={"text"}
      placeholder={"별명 5~15자"}
      required={true}
      errorMsg={
        joinValid.nick.errorMsg !== "" && joinValid.nick?.errorMsg
          ? joinValid.nick.errorMsg
          : ""
      }
      initValue={joinPayload.userNick}
      setPayload={(payloadValue) =>
        setJoinPayload({ ...joinPayload, userNick: payloadValue })
      }
    />
  );
};
export default UserNickArea;

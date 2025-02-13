import JoinRowInput from "@/components/join/common/JoinRowInput.tsx";
import useUserStore from "@/store/userStore.ts";
import { useEffect, useMemo } from "react";
import { useUserNickDupCheck } from "@/reactQuery/memberQuery.ts";

const UserNickArea = () => {
  const { joinPayload, setJoinPayload, joinValid, setJoinValid } =
    useUserStore();

  const checkDupNick: boolean = useUserNickDupCheck(joinPayload.userNick);

  useEffect(() => {
    if (
      joinPayload.userNick &&
      joinPayload.userNick.length > 0 &&
      !validUserNick
    ) {
      return setJoinValid({
        ...joinValid,
        nick: {
          isValid: false,
          errorMsg: "5글자 이상 15글자 이내 여야 합니다.",
        },
      });
    }

    if (joinPayload.userNick.length === 0) {
      return setJoinValid({
        ...joinValid,
        nick: {
          isValid: false,
        },
      });
    }

    setJoinValid({
      ...joinValid,
      nick: checkDupNick
        ? { isValid: true }
        : {
            isValid: false,
            errorMsg: "사용할 수 없는 닉네임입니다.",
          },
    });
  }, [joinPayload.userNick, checkDupNick]);

  const validUserNick: boolean = useMemo(() => {
    const lengthPattern = /^.{5,15}$/;
    return lengthPattern.test(joinPayload.userNick);
  }, [joinPayload.userNick]);

  // TODO: 닉네임에 설정할 한글, 영문, 숫자만을 허용하는 정규식 repl 함수

  return (
    <JoinRowInput
      key={`JOIN_ROW_INPUT_USER_NICK_${joinPayload.userNick}`}
      label={"닉네임"}
      type={"text"}
      placeholder={"별명 5~15자"}
      required={true}
      autoFocus={true}
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

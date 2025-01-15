import { useEffect } from "react";
import { useUserIdCheck } from "@/reactQuery/memberQuery.ts";
import useUserStore from "@/store/userStore.ts";
import JoinRowInput from "@/components/join/JoinRowInput.tsx";
import { TErrorMsg } from "@/types/user.types.ts";

const UserIdArea = () => {
  const { joinPayload, setJoinPayload, joinValid, setJoinValid } =
    useUserStore();
  const { refetch: idCheck } = useUserIdCheck(joinPayload.userId);

  useEffect(() => {
    if (joinPayload.userId) {
      const userIdValid: boolean = validationUserId(joinPayload.userId);
      if (userIdValid) {
        idCheck().then(({ data }) => {
          const isNotDuplicate: boolean = data?.data?.data as boolean;
          console.log("idCheck() data ", isNotDuplicate);
          setJoinValid({
            ...joinValid,
            id: isNotDuplicate
              ? { isValid: true }
              : { isValid: false, errorMsg: "중복된 아이디입니다." },
          });
        });
      }
    }
  }, [joinPayload.userId]);

  const validFailed = (reason: TErrorMsg) => {
    return setJoinValid({
      ...joinValid,
      id: { isValid: false, errorMsg: reason },
    });
  };

  const validationUserId = (userId: string): boolean => {
    // 기본 상태
    if (userId.length === 0) {
      validFailed("");
      return false;
    }

    // 1. 길이 검사: 6글자 이상 15글자 이내
    if (userId.length < 6 || userId.length > 15) {
      validFailed("6글자 이상 15글자 이내 여야 합니다.");
      return false;
    }

    // 2. 특수문자 검사: 영문자 혹은 숫자 이외의 문자 안되도록
    const invalidPattern = /[^A-Za-z0-9]/; // 영문자와 숫자가 아닌 모든 문자
    if (invalidPattern.test(userId)) {
      validFailed("한글 혹은 특수 문자가 포함되어 있습니다.");
      return false;
    }

    // 3. 영문자와 숫자 조합 검사 또는 영문자만 검사
    const hasLetter = /[A-Za-z]/.test(userId);
    const hasNumber = /[0-9]/.test(userId);
    if (hasNumber) {
      validFailed("숫자만 입력된 아이디는 사용할 수 없습니다.");
      return false;
    }

    // 영문자만 있거나 영문자와 숫자가 모두 포함되어야 함
    if (!hasLetter || (userId.length > 0 && !hasLetter && !hasNumber)) {
    }

    return true;
  };

  return (
    <JoinRowInput
      type={"text"}
      placeholder={"아이디 입력"}
      label={"아이디"}
      required={true}
      errorMsg={
        joinValid.id.errorMsg !== "" && joinValid.id?.errorMsg
          ? joinValid.id.errorMsg
          : ""
      }
      setPayload={(payloadValue) =>
        setJoinPayload({ ...joinPayload, userId: payloadValue })
      }
    />
  );
};

export default UserIdArea;

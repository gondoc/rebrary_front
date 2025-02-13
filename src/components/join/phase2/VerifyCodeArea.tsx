import useUserStore from "@/store/userStore.ts";
import React, { useEffect, useRef, useState } from "react";
import EmailVerifyCodeInput from "@/components/join/phase2/EmailVerifyCodeInput.tsx";
import { isNumeric, typingNumCheck } from "@/util/commonUtil.ts";
import {
  useSendEmailCode,
  useVerifyEmailCodeMutation,
} from "@/reactQuery/memberQuery.ts";

const VerifyCodeArea = () => {
  const { joinValid, setJoinValid, joinPayload, verifyCode, setVerifyCode } =
    useUserStore();
  const [title, setTitle] = useState<string>(
    "이메일로 발송된 인증코드를 입력해주세요!\n이메일이 수신되지 않았을 경우 스팸함을 확인해주세요!",
  );
  const focusRef = useRef<(HTMLInputElement | null)[]>(new Array(6).fill(null));
  const { data } = useSendEmailCode(joinPayload.userEmail);
  const { mutate: verify, status } = useVerifyEmailCodeMutation(
    (res: boolean) =>
      setJoinValid({
        ...joinValid,
        emailCheck: res
          ? { isValid: true }
          : {
              isValid: false,
              errorMsg: "유효하지 않은 인증번호입니다.",
            },
      }),
    () =>
      setJoinValid({
        ...joinValid,
        emailCheck: {
          isValid: false,
          errorMsg: "오류가 발생했습니다. 잠시후 시도 바랍니다.",
        },
      }),
  );

  useEffect(() => {
    if (data?.data?.data) {
      if (status === "success" && joinValid.emailCheck.isValid) {
        setTitle("인증되었습니다!");
      } else {
        setTitle(joinValid.emailCheck.errorMsg as string);
      }
    }
  }, [status, joinValid.emailCheck]);

  useEffect(() => {
    // 6글자 작성완료 여부 검증
    if (verifyCode.valid()) {
      verify({ code: verifyCode.getCodes(), email: joinPayload.userEmail });
    }
  }, [verifyCode.cd]);

  // 붙여넣기 적용 함수
  const pasteValue = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const code: string = e.clipboardData.getData("text");
    if (isNumeric(code)) {
      setVerifyCode([...code.split("")]);
      focusRef.current[5]?.focus();
    }
  };

  // Backspace key down handler
  const keyDownHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    const key: string = e.key;
    if (key === "Backspace") {
      if (index !== 0) {
        moveFocus(index - 1);
      }
      verifyCode.cd[index] = "";
      return setVerifyCode([...verifyCode.cd]);
    }
  };

  // 타이핑에 따라 호출 및 적용되는 함수
  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value: string = e.target.value;
    // 정상 값 타이핑한 경우
    if (isNumeric(value)) {
      verifyCode.cd[index] = typingNumCheck(value);
      setVerifyCode([...verifyCode.cd]);
      if (index < 5) {
        moveFocus(index + 1);
      }
    }
  };

  // 포커스 이동 함수
  const moveFocus = (moveIndex: number) => {
    if (focusRef.current && focusRef.current[moveIndex]) {
      focusRef.current[moveIndex]?.focus();
    }
  };

  return (
    <div className={"verify-code-wrapper"}>
      <div className={"title"}>{title}</div>
      <div className={"verify-code-area"}>
        {Array.from({ length: 6 }).map((_, index: number) => {
          return (
            <EmailVerifyCodeInput
              key={`EMAIL_VERIFY_CODE_INPUT_${index}`}
              index={index}
              value={verifyCode.cd[index]}
              ref={(el: HTMLInputElement) => {
                focusRef.current[index] = el;
              }}
              disabled={joinValid.emailCheck.isValid}
              onPaste={(e) => pasteValue(e)}
              onKeyDown={(e) => keyDownHandler(e, index)}
              onChange={(e) => changeHandler(e, index)}
            />
          );
        })}
      </div>
    </div>
  );
};
export default VerifyCodeArea;

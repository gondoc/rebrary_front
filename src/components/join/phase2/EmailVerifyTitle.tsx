import { useEffect, useState } from "react";
import useUserStore from "@/store/userStore.ts";
import {
  useSendEmailCode,
  useVerifyEmailCodeMutation,
} from "@/reactQuery/memberQuery.ts";
import EmailVerifyHelpMsg from "@/components/join/phase2/EmailVerifyHelpMsg.tsx";

const EmailVerifyTitle = () => {
  const [title, setTitle] = useState<string>(
    "이메일로 발송된 인증코드를 입력해주세요!\n이메일이 수신되지 않았을 경우 스팸함을 확인해주세요!",
  );
  const { joinValid, joinPayload } = useUserStore();
  const { data: emailCodeReqRes, isFetched } = useSendEmailCode(
    joinPayload.userEmail,
  );
  const { status } = useVerifyEmailCodeMutation();

  useEffect(() => {
    if (emailCodeReqRes) {
      if (status === "success" && joinValid.emailVerify.isValid) {
        return setTitle("인증되었습니다!");
      }
      if (!joinValid.emailVerify.isValid && joinValid.emailVerify.errorMsg) {
        return setTitle(joinValid.emailVerify.errorMsg as string);
      }
    }
  }, [status, joinValid.emailVerify]);

  return (
    <div className={"title"}>
      {title}
      {isFetched && <EmailVerifyHelpMsg />}
    </div>
  );
};

export default EmailVerifyTitle;

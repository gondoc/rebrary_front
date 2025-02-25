import useTimer from "@/hook/useTimer.ts";
import { useSendEmailCode } from "@/reactQuery/memberQuery.ts";
import useUserStore from "@/store/userStore.ts";
import dayjs from "dayjs";
import { useEffect } from "react";
import ExpireVerifyCode from "@/components/join/phase2/ExpireVerifyCode.tsx";

const EmailVerifyHelpMsg = () => {
  const { joinPayload } = useUserStore();

  const { data: emailCodeReqRes } = useSendEmailCode(joinPayload.userEmail);

  useEffect(() => {
    console.log("emailCodeReqRes ", emailCodeReqRes);
  }, [emailCodeReqRes]);

  const isExpired: boolean = useTimer(emailCodeReqRes);

  return (
    <div className={"help-msg"}>
      {!isExpired ? (
        <>
          보내드린 인증 코드는{" "}
          <span>{dayjs(emailCodeReqRes).format("h:mm:ss")}</span>
          까지 유효합니다.
        </>
      ) : (
        <ExpireVerifyCode />
      )}
    </div>
  );
};

export default EmailVerifyHelpMsg;

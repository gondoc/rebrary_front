import useTimer from "@/hook/useTimer.ts";
import { useSendEmailCode } from "@/reactQuery/memberQuery.ts";
import useUserStore from "@/store/userStore.ts";
import dayjs from "dayjs";

const EmailVerifyHelpMsg = () => {
  const { joinPayload, joinValid } = useUserStore();

  const { data: emailCodeReqRes, refetch: reqReFetch } = useSendEmailCode(
    joinPayload.userEmail,
  );
  const timer = useTimer(emailCodeReqRes);

  const requestReSendEmailCd = () => {
    if (joinValid.emailVerify.isValid) {
      return;
    }

    return reqReFetch();
  };

  return !timer ? (
    <div>
      보내드린 인증 코드는{" "}
      <span>{dayjs(emailCodeReqRes).format("h:mm:ss")}</span>
      까지 유효합니다.
    </div>
  ) : (
    <div>
      <br />
      앗! 보내드린 인증 코드가 만료되었어요!{" "}
      <button
        className={"re-fetch-button"}
        onClick={() => requestReSendEmailCd()}
      >
        코드 재전송 요청
      </button>
    </div>
  );
};

export default EmailVerifyHelpMsg;

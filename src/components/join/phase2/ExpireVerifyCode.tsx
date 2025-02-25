import { QueryKeys } from "@/reactQuery/queryKeys.ts";
import useUserStore from "@/store/userStore.ts";
import { useSendEmailCode } from "@/reactQuery/memberQuery.ts";
import { useQueryClient } from "@tanstack/react-query";

const ExpireVerifyCode = () => {
  const queryClient = useQueryClient();
  const { joinPayload, joinValid } = useUserStore();
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const { refetch: reqReFetch, isRefetching } = useSendEmailCode(
    joinPayload.userEmail,
  );

  const requestReSendEmailCd = () => {
    if (joinValid.emailVerify.isValid) {
      return;
    }

    reqReFetch().then(() => {
      queryClient.invalidateQueries({
        queryKey: QueryKeys.member.email.codeSend(joinPayload.userEmail),
      });
    });
    console.log("verifyCd send req success !! ");
  };

  return (
    <>
      앗! 보내드린 인증 코드가 만료되었어요! <br />
      <button
        type="button"
        className={`re-fetch-button ${isRefetching && "isLoading"}`}
        onClick={() => requestReSendEmailCd()}
        disabled={isRefetching}
      >
        {!isRefetching ? (
          "코드 재전송 요청"
        ) : (
          <div className={"loading"}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </button>
    </>
  );
};

export default ExpireVerifyCode;

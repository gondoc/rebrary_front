import UserEmailArea from "@/components/join/phase1/UserEmailArea.tsx";
import UserPwArea from "@/components/join/phase1/UserPwArea.tsx";
import UserPwConfirmArea from "@/components/join/phase1/UserPwConfirmArea.tsx";
import useUserStore from "@/store/userStore.ts";

const Phase1 = () => {
  const { joinValid } = useUserStore();
  return (
    <div className={`phase ${joinValid.phase === 0 && "active"}`}>
      {/* 이메일 작성영역 */}
      <UserEmailArea />

      {/* 비밀번호 작성영역 */}
      <UserPwArea />

      {/* 비밀번호 확인 작성영역 */}
      <UserPwConfirmArea />
    </div>
  );
};
export default Phase1;

import EmailInput from "@/components/join/phase1/EmailInput.tsx";
import PwInput from "@/components/join/phase1/PwInput.tsx";
import PwConfirmInput from "@/components/join/phase1/PwConfirmInput.tsx";

const UserIdPwArea = () => {
  return (
    <>
      {/* 이메일 작성영역 */}
      <EmailInput />

      {/* 비밀번호 작성영역 */}
      <PwInput />

      {/* 비밀번호 확인 작성영역 */}
      <PwConfirmInput />
    </>
  );
};
export default UserIdPwArea;

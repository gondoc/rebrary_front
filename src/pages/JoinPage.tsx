import {useUserJoinMutation} from "../reactQuery/memberQuery.ts";
import UserIdArea from "../components/join/UserIdArea.tsx";
import userStore from "@/store/userStore.ts";
import UserPwArea from "@/components/join/UserPwArea.tsx";
import UserPwConfirmArea from "@/components/join/UserPwConfirmArea.tsx";
import UserEmailArea from "@/components/join/UserEmailArea.tsx";
import UserNickArea from "@/components/join/UserNickArea.tsx";

const JoinPage = () => {
    const {joinPayload, joinValid} = userStore();
    const {mutate: register} = useUserJoinMutation(
        () => console.log("성공!"),
        () => console.log(""),
    );

    const submitBtnClickHandler = () => {
        register(joinPayload);
    };

    const isAllValid = () => {
        return !(
            joinValid.id.isValid &&
            joinValid.pw.isValid &&
            joinValid.pwConfirm.isValid &&
            joinValid.email.isValid &&
            joinValid.nick.isValid
        );
    };

    return (
        <div className={"join-wrapper"}>
            <div className="join-container">
                <div className="title-area">
                    <div className={"logo"}>RE;BRARY</div>
                    <br/>
                    <div className={"title"}>회원가입</div>
                </div>

                <form className={"join-area"}>
                    {/* 아이디 작성영역 */}
                    <UserIdArea/>

                    {/* 비밀번호 작성영역 */}
                    <UserPwArea/>

                    {/* 비밀번호 확인 작성영역 */}
                    <UserPwConfirmArea/>

                    {/* 이메일 작성영역 */}
                    <UserEmailArea/>

                    {/* 닉네임 작성영역 */}
                    <UserNickArea/>

                    <button
                        type="button"
                        disabled={isAllValid()}
                        onClick={() => submitBtnClickHandler()}
                    >
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JoinPage;

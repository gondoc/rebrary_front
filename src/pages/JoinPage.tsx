import userStore from "@/store/userStore.ts";
import { useEffect } from "react";
import CommBackBtn from "@/components/common/CommBackBtn.tsx";
import { useNavigate } from "react-router-dom";
import Phase1 from "@/components/join/phase1/Phase1.tsx";
import Phase2 from "@/components/join/phase2/Phase2.tsx";
import Phase3 from "@/components/join/phase3/Phase3.tsx";
import {
  useSendEmailCode,
  useUserJoinMutation,
  useUserNickQuery,
} from "@/reactQuery/memberQuery.ts";
import { INIT_JOIN_PAYLOAD, INIT_JOIN_VALID } from "@/const/join.const.ts";

const JoinPage = () => {
  const navigator = useNavigate();
  const {
    joinPayload,
    setJoinPayload,
    joinValid,
    setJoinValid,
    setVerifyCode,
  } = userStore();

  const { refetch: sendCode } = useSendEmailCode(joinPayload.userEmail);
  const { refetch: reqUserRandomNick } = useUserNickQuery();

  const { mutate: register } = useUserJoinMutation(
    () => console.log("성공!"),
    () => console.log("실패"),
  );

  // 뒤로 가기 버튼 클릭
  const prevBtnClickHandler = () => {
    if (joinValid.phase === 0) {
      setJoinPayload(INIT_JOIN_PAYLOAD);
      setJoinValid(INIT_JOIN_VALID);
      return navigator("/login");
    }
    if (joinValid.phase === 1) {
      if (!joinValid.emailCheck.isValid) {
        // 인증이 안되어 있는 경우 인증번호 초기화
        setVerifyCode([]);
      }
    }
    if (joinValid.phase === 2) {
      if (joinPayload.userNick.length === 0) {
        reqUserRandomNick().then(({ data }) => {
          if (data) {
            setJoinPayload({ ...joinPayload, userNick: data });
          }
        });
      }
    }
    return setJoinValid({
      ...joinValid,
      phase: --joinValid.phase,
    });
  };

  const nextBtnClickHandler = () => {
    if (joinValid.phase === 0) {
      // 인증코드 발송 요청
      if (!joinValid.emailCheck.isValid) {
        sendCode().then(({ data }) => {
          console.log("sendCode data ", data);
        });
      }
      return nextValid();
    }

    if (joinValid.phase === 1) {
      // 닉네임 요청
      reqUserRandomNick().then(({ data }) => {
        if (typeof data === "string") {
          setJoinPayload({ ...joinPayload, userNick: data });
        }
      });
      return nextValid();
    }

    if (joinValid.phase === 2 && joinValid.topPhase === 2) {
      return register(joinPayload);
    }
  };

  const nextValid = () => {
    setJoinValid({
      ...joinValid,
      topPhase:
        joinValid.topPhase === joinValid.phase
          ? ++joinValid.topPhase
          : joinValid.topPhase,
      phase: ++joinValid.phase,
    });
  };

  const phaseValid = () => {
    if (joinValid.phase === 0) {
      return !(
        joinValid.email.isValid &&
        joinValid.pw.isValid &&
        joinValid.pwConfirm.isValid
      );
    } else if (joinValid.phase === 1) {
      return !joinValid.emailCheck.isValid;
      // return false;
    } else if (joinValid.phase === 2) {
      return !joinValid.nick.isValid;
    }
  };

  useEffect(() => {
    console.log("검증 ", joinValid);
  }, [joinValid]);

  useEffect(() => {
    console.log("검증 ", joinPayload);
  }, [joinPayload]);

  const nextBtnStr = () => {
    if (joinValid.phase === 0) {
      return "이메일 주소 인증";
    } else if (joinValid.phase === 1) {
      return "닉네임 설정";
    } else if (joinValid.phase === 2) {
      return "회원가입 완료";
    }
  };

  return (
    <div className={"join-wrapper"}>
      <div className="join-container">
        <div className={"back-btn-wrapper"}>
          <CommBackBtn onClickHandler={() => prevBtnClickHandler()} />
        </div>
        <div className="title-area">
          <div className={"logo"}>RE;BRARY</div>
          <br />
          <div className={"title"}>회원가입</div>
        </div>

        <form className={"join-area"}>
          <Phase1 />
          <Phase2 />
          <Phase3 />
          <div className={"button-wrapper"}>
            {/*<button*/}
            {/*  type="button"*/}
            {/*  disabled={phaseValid()}*/}
            {/*  onClick={() => nextBtnClickHandler()}*/}
            {/*>*/}
            {/*  test*/}
            {/*</button>*/}
            {/*<a href="sms:rebrary.official@gmail.com?body=123456">*/}
            {/*  인증문자 보내기*/}
            {/*</a>*/}
            <button
              type="button"
              disabled={phaseValid()}
              onClick={() => nextBtnClickHandler()}
            >
              {nextBtnStr()}
            </button>
          </div>
        </form>
      </div>
      <div className={"progress-bar-wrapper"}>
        <div className={`progress-bar phase${joinValid.topPhase}`} />
      </div>
    </div>
  );
};

export default JoinPage;

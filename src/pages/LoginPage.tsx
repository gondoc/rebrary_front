import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigator = useNavigate();

  // const [cookies, setCookie, remove] = useCookies(["rememberMember"]);
  // useEffect(() => {
  //   if (cookies.rememberMember) {
  //     // set
  //   }
  // }, []);

  return (
    <div className={"login-wrapper"}>
      <div className="login-container">
        <div className="title-area">
          <div className={"logo"}>RE;BRARY</div>
          <br />
          <div className={"title"}>로그인</div>
        </div>

        <form className={"login-area"}>
          <div className={"input-area"}>
            <label>이메일</label>
            <input
              type="text"
              className={"id"}
              placeholder="이메일을 입력해주세요."
              required
            />
          </div>

          <div className={"input-area"}>
            <label>비밀번호</label>
            <div className="password-wrapper">
              <input
                autoComplete={"off"}
                type="password"
                className="password"
                placeholder="영문, 숫자 조합 8~16자"
                required
              />
              <div>
                <i></i>
              </div>
            </div>
          </div>
          <button type="submit">로그인</button>
        </form>

        <div className="login-options-container">
          <div className={"login-options"}>
            <div className={"id-"}>
              <label>
                <input type="checkbox" /> 계정 기억하기
              </label>
            </div>
            <a onClick={() => navigator("/find")}>계정 / 비밀번호 찾기</a>
          </div>
        </div>
        <div className={"register-area"}>
          아직 회원이 아니신가요?&nbsp;
          <a onClick={() => navigator("/join")}>회원가입</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

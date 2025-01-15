import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigator = useNavigate();

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
            <label>아이디</label>
            <input
              type="text"
              className={"id"}
              placeholder="아이디를 입력해주세요."
              required
            />
          </div>

          <div className={"input-area"}>
            <label>비밀번호</label>
            <div className="password-wrapper">
              <input
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
            <label>
              <input type="checkbox" /> 아이디 저장
            </label>
            <a onClick={() => navigator("/find")}>아이디 / 비밀번호 찾기</a>
          </div>
        </div>
        <div className={"register-area"}>
          아직 회원이 아니신가요?{" "}
          <a onClick={() => navigator("/join")}>회원가입</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

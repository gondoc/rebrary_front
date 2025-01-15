import {useState} from "react";

const FindPage = () => {

    const [findDisable, setFindDisable] = useState<boolean>(false)
    const [activeFind, setActiveFind] = useState<string>("id");

    return (
        <div className={"find-wrapper"}>
            <div className="find-container">
                <div className="title-area">
                    <div className={"logo"}>RE;BRARY</div>
                </div>

                <div className={"find-btn-group"}>
                    <div className={`find-btn-id ${activeFind === "id" ? "active" : ""}`}
                         onClick={() => setActiveFind("id")}>
                        아이디 찾기
                    </div>
                    <div className={`find-btn-pw ${activeFind === "pw" ? "active" : ""}`}
                         onClick={() => setActiveFind("pw")}>
                        비밀번호 찾기
                    </div>
                </div>

                <div className={"find-area"}>
                    {/* 아이디 찾기 */}
                    {
                        activeFind === "id" &&
                        <div className={"input-area"}>
                            <label>가입한 이메일 주소</label>
                            <div className="password-wrapper">
                                <input type="email" className="password" placeholder="이메일 주소를 입력해주세요" required/>
                            </div>
                        </div>
                    }

                    {
                        activeFind === "pw" &&
                        <>
                            <div className={"input-area"}>
                                <label>가입한 이메일 주소</label>
                                <div className="password-wrapper">
                                    <input type="email" className="password" placeholder="이메일 주소를 입력해주세요" required/>
                                    <button>인증번호 받기</button>
                                </div>
                            </div>

                            <div className={"input-area"}>
                                <label>인증번호</label>
                                <div className="password-wrapper">
                                    <input type="text" className="password" placeholder="인증 번호를 입력해주세요." required/>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className={"button-wrapper"}>
                    <button type="button" disabled={findDisable} onClick={() => setFindDisable(!findDisable)}>
                        {activeFind === "id" ? "아이디" : "비밀번호"} 찾기
                    </button>
                </div>

            </div>

        </div>
    )
}

export default FindPage
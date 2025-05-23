export type TUser = "member" | "admin";

export type TErrorMsg =
  | ""
  | "유효하지 않은 인증번호입니다."
  | "중복된 아이디입니다."
  | "이미 등록된 이메일 주소입니다."
  | "사용할 수 없는 이메일 주소입니다."
  | "영문자 혹은 영문자와 숫자로 이루어져야 합니다."
  | "사용할 수 없는 닉네임입니다."
  | "한글 혹은 특수 문자가 포함되어 있습니다."
  | "특수 문자가 포함되어 있습니다."
  | "비밀번호가 일치하지 않습니다."
  | "이메일 주소 형식과 맞지 않습니다."
  | "5글자 이상 15글자 이내 여야 합니다."
  | "6글자 이상 15글자 이내 여야 합니다."
  | "오류가 발생했습니다. 잠시후 시도 바랍니다."
  | "숫자만 입력된 아이디는 사용할 수 없습니다."
  | "영문자와 숫자, 그리고 1글자 이상의 특수문자가 포함되어야 합니다.";

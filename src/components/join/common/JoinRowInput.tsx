import { useEffect, useState } from "react";
import useDebounce from "../../../hook/useDebounce.ts";
import { TErrorMsg } from "@/types/user.types.ts";

const JoinRowInput = ({
  label,
  className,
  type,
  inputClassName,
  placeholder,
  autoFocus,
  required,
  setPayload,
  errorMsg,
  initValue,
}: {
  label: string;
  className?: string;
  type: string;
  inputClassName?: string;
  placeholder: string;
  autoFocus?: boolean;
  required?: boolean;
  errorMsg?: TErrorMsg;
  setPayload?: (payloadValue: string) => void;
  initValue?: string;
}) => {
  const [typing, setTyping] = useState<string>(initValue ? initValue : "");
  const debounceValue = useDebounce(typing);

  useEffect(() => {
    if (setPayload) {
      setPayload(debounceValue);
    }
  }, [debounceValue]);

  return (
    <div className="input-area" key={label}>
      <label>{label}</label>
      <div className={className}>
        <input
          autoComplete={"off"}
          type={type}
          value={typing}
          autoFocus={autoFocus}
          onChange={(e) => setTyping(e.target.value)}
          className={`${inputClassName} ${errorMsg !== "" && "isError"}`}
          placeholder={placeholder}
          required={required}
        />
        {errorMsg && <span>{errorMsg}</span>}
      </div>
    </div>
  );
};

export default JoinRowInput;

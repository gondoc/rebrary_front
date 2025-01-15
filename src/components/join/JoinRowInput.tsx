import { useEffect, useState } from "react";
import useDebounce from "../../hook/useDebounce.ts";
import { TErrorMsg } from "@/types/user.types.ts";

const JoinRowInput = ({
  label,
  className,
  type,
  inputClassName,
  placeholder,
  required,
  setPayload,
  errorMsg,
}: {
  label: string;
  className?: string;
  type: string;
  inputClassName?: string;
  placeholder: string;
  required?: boolean;
  errorMsg?: TErrorMsg;
  setPayload?: (payloadValue: string) => void;
}) => {
  const [typing, setTyping] = useState<string>("");
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
          type={type}
          value={typing}
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

import { ChangeEvent, FC, InputHTMLAttributes, PropsWithChildren, ReactNode, useCallback } from "react";
import cn from "classnames";
import style from "./style.module.scss";
import { WarningCircle } from "components/svgIcons";

export const FormBox: FC<PropsWithChildren<unknown>> = ({ children }) => <div className={style["form-box"]}>{children}</div>

export const FormError: FC<PropsWithChildren<unknown>> = ({ children }) => <div className={style["form-error"]}><div className={style["form-error__icon"]}><WarningCircle fill="#a73b3b" /></div>{children}</div>

interface InputGeneratorProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hasError?: boolean;
  inputBtn?: ReactNode;
}

const InputGenerator: FC<InputGeneratorProps> = (props) => {
  const { value, onChange, label, placeholder, hasError, inputBtn, ...rest } = props;

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  }, [onChange]);

  if (inputBtn) {
    return (
      <>
        {label ? <label className={style["input-label"]}>{label}</label> : null}
        <div className={style["form-box__row"]}>
          <input {...rest} placeholder={placeholder} className={cn(style["input-gen"], hasError && style["input-gen_error"])} onChange={handleChange} />
          {inputBtn}
        </div>
      </>
    )
  }

  return (
    <>
      {label ? <label className={style["input-label"]}>{label}</label> : null}
      <input {...rest} placeholder={placeholder} className={cn(style["input-gen"], hasError && style["input-gen_error"])} onChange={handleChange} />
    </>
  )
}

export default InputGenerator;
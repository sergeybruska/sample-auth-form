import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";
import cn from "classnames";
import style from "./style.module.scss";

export enum ButtonStyles {
  PRIMARY,
  SECONDARY,
  SUCCESS,
  DEFAULT
}

interface ButtonGeneratorProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle: "primary" | "secondary" | "success" | "default" | "gradient";
  size: "small" | "medium" | "large";
  fullWidth?: boolean;
}

const ButtonGenerator: FC<PropsWithChildren<unknown> & ButtonGeneratorProps> = (props) => {
  const { children, buttonStyle, size, onClick, fullWidth, disabled, ...rest } = props;

  const buttonClass = cn(
    style.btn,
    { [style["btn_disabled"]]: disabled },
    { [style[`btn_${buttonStyle}`]]: buttonStyle },
    { [style[`btn_${size}`]]: size },
    fullWidth && style.btn_full
  );
  return (
    <button className={buttonClass} {...rest} onClick={onClick}>
      <div className={style.btn__caption}>{children}</div>
    </button>
  )
}

export default ButtonGenerator;
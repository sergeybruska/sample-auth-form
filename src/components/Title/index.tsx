import { FC, PropsWithChildren } from "react";
import cn from "classnames";
import style from "./style.module.scss";

interface TitleProps {
  component: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color: "white" | "black" | "gradient";
  fontWeight?: 400 | 500 | 600 | 700;
  align: "left" | "center" | "right";
}

const Title: FC<PropsWithChildren<unknown> & TitleProps> = ({ children, color, fontWeight = "bold", component, variant, align }) => {

  const titleClass = cn(
    style.title,
    { [style[`title_${variant}`]]: variant },
    { [style[`title_${color}`]]: color },
    { [style[`title_${fontWeight}`]]: fontWeight },
    { [style[`title_${align}`]]: align },
  );

  if (component === "h1") {
    return (
      <h1 className={titleClass}>{children}</h1>
    )
  }

  if (component === "h2") {
    return (
      <h2 className={titleClass}>{children}</h2>
    )
  }

  if (component === "h3") {
    return (
      <h3 className={titleClass}>{children}</h3>
    )
  }

  if (component === "h4") {
    return (
      <h4 className={titleClass}>{children}</h4>
    )
  }

  if (component === "h5") {
    return (
      <h5 className={titleClass}>{children}</h5>
    )
  }

  return (
    <h6 className={titleClass}>{children}</h6>
  )
  
}

export default Title;
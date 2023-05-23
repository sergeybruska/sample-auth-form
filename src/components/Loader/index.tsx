import { FC, useEffect } from "react";
import cn from "classnames";
import Spinner from "components/Spinner";
import style from "./style.module.scss";

interface Props {
  typeLoader?: "filled" | "transparent";
}

const Loader: FC<Props> = ({ typeLoader = "filled" }) => {
  useEffect(() => {
    document.body.classList.add("body-overflow");
    return () => {
      document.body.classList.remove("body-overflow");
    };
  }, []);

  return (
    <div
      className={cn(style["loader-page"], style[`loader-page_${typeLoader}`])}
    >
      <div className={style["loader-page__icon"]}>
        <Spinner
          className={style["loader-page__icon_spinner"]}
          type={"purple"}
        />
      </div>
    </div>
  );
};

export default Loader;

import { FC, PropsWithChildren, } from "react";
import { use100vh } from 'react-div-100vh';
import cn from "classnames";
import Header from "components/Header";
import style from "./style.module.scss";
import Toast from "components/Toast";

export enum LayoutContent {
  APP,
  ONESCREEN
}

interface LayoutProps {
  content: LayoutContent;
}

const Layout: FC<PropsWithChildren<unknown> & LayoutProps> = ({ children, content }) => {
  
  const height = use100vh() || '100vh';

  return (
    <div className={style.layout} style={{ height: content === LayoutContent.ONESCREEN ? height! : "auto" }}>
      <Header />
      <div className={cn(style.layout__content, content === LayoutContent.ONESCREEN ? style["layout__content--center"] : style["layout__content--top"])}>
        {children}
        <Toast />
      </div>

    </div>
  )
}

export default Layout;
import { FC } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import style from "./style.module.scss";
import { Logo } from "components/svgIcons";
import { useSelector } from "react-redux";
import { userSelectors } from "store/userSlice";
import { UserTypes } from "models/user";
import { maskEmail } from "utils/utils";

interface UserHeaderProps {
  user: UserTypes;
}

const UserHeaderBlock: FC<UserHeaderProps> = ({ user }) => {
  return (
    <div className={style["header-user"]}>
      <img src={user.avatar} alt={user.username} className={style["header-user__ava"]} />
      <div className={style["header-user__box"]}>
        <div className={style["header-user__name"]}>{user.username}</div>
        <div className={style["header-user__email"]}>{maskEmail(user.email)}</div>
      </div>
    </div>
  )
}

const Header: FC = () => {

  const isAuth = useSelector(userSelectors.selectIsAuth);
  const currentUser = useSelector(userSelectors.selectCurrentUser);

  if (isAuth && currentUser) {
    return (
      <header className={style.header}>
        <div className={cn(style.header__row, style["header__row_auth"])}>
          <Link to="/" className={style.header__logo}>
            <Logo />
          </Link>
          <UserHeaderBlock user={currentUser} />
        </div>
      </header>
    )
  }

  return (
    <header className={style.header}>
      <div className={style.header__row}>
        <Link to="/" className={style.header__logo}>
          <Logo />
        </Link>
      </div>
    </header>
  );
};

export default Header;

import { FC, useCallback } from "react";
import style from "./style.module.scss";
import { UserTypes } from "models/user";
import ButtonGenerator from "components/ButtonGenerator";
import { useAppDispatch } from "store";
import { logOut } from "store/userSlice";
import Title from "components/Title";

interface UserBlockProps {
  user: UserTypes;
}

const UserBlock: FC<UserBlockProps> = ({ user }) => {

  const dispatch = useAppDispatch();

  const handleLogOut = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  return (
    <div className={style["profile-info"]}>
      <Title variant="h2" component="h1" color="white" align="left">Hi, there!</Title>
      <p className={style["profile-info__text"]}>Please note that mock authorisation is currently in use. In a real application, the backend will send to the frontend access token and refresh token, providing you with seamless secure access to your personal account.</p>
      <ButtonGenerator buttonStyle="primary" size="large" onClick={handleLogOut}>Log Out</ButtonGenerator>
    </div>
  )
}

export default UserBlock;
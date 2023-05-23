import Loader from "components/Loader";
import UserBlock from "components/ProfilePageInfo";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userSelectors } from "store/userSlice";

const ProfilePage: FC = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(userSelectors.selectCurrentUser);

  useEffect(() => {
    if (!currentUser) {
      navigate('/signin', { replace: true });
    }
  }, [currentUser, navigate])

  if (!currentUser) {
    return <Loader />
  }

  return (
    <>
      <UserBlock user={currentUser} />
    </>
  )
}

export default ProfilePage;
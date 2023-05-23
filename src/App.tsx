import { useSelector } from 'react-redux';
import { usePageRoutes } from 'routes';
import { userSelectors } from 'store/userSlice';

function App() {
  const isAuth = useSelector(userSelectors.selectIsAuth);

  const routes = usePageRoutes(isAuth);
  return <>{routes}</>;
}

export default App;

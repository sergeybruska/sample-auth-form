import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Loader from "components/Loader";
import SignInPage from "pages/SignIn";
import ProfilePage from "pages/Profile";
import { LayoutContent } from "components/Layout";

const LayoutContainer = lazy(() => import("components/Layout"));

export const usePageRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Suspense fallback={<Loader />}>
        <LayoutContainer content={LayoutContent.APP}>
          <Routes>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate replace to="/profile" />} />
          </Routes>
        </LayoutContainer>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loader />}>
      <LayoutContainer content={LayoutContent.ONESCREEN}>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="*" element={<Navigate replace to="/signin" />} />
        </Routes>
      </LayoutContainer>
    </Suspense>
  );
};

import { FC } from "react";
import { SignInFormProvider } from "providers/SignInProvider";
import SignInForm from "components/SignInForm";

const SignInPage: FC = () => {
  return (
    <>
      <SignInFormProvider>
        <SignInForm />
      </SignInFormProvider>
    </>
  )
}

export default SignInPage;
import { FC, PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from "react";
import { FormikConfig, FormikProps, useFormik } from 'formik';
import { SignInModel, SignInModel_DEFAULT, SignInModel_SCHEMA } from "models/auth";
import { useAppDispatch } from "store";
import { signInAction } from "store/userSlice";

interface AuthContextType {
  form: FormikProps<SignInModel> | null;
  loading: boolean;
}

const DEFAULT: AuthContextType = {
  form: null,
  loading: false,
}

const SignInForm = createContext<AuthContextType>(DEFAULT);

export const SignInFormProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [initialValues] = useState<SignInModel>(SignInModel_DEFAULT);
  const [loading, setLoading] = useState<boolean>(false);

  const submitForm = useCallback<FormikConfig<SignInModel>['onSubmit']>(async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setSubmitting(true);
      dispatch(signInAction(values));
    } catch (e) {
      return false;
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  }, [dispatch])

  const form = useFormik<SignInModel>({
    enableReinitialize: true,
    initialValues,
    onSubmit: submitForm,
    validationSchema: SignInModel_SCHEMA,
  });

  const ctx = useMemo(() => ({
    form,
    loading
  }), [form, loading]);

  return (
    <SignInForm.Provider value={ctx}>
      {children}
    </SignInForm.Provider>
  );
}

export const useSignInController = () => useContext(SignInForm);

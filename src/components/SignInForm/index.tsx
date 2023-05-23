import { FC, useCallback, useState } from "react";
import style from "./style.module.scss";
import InputGenerator, { FormBox, FormError } from "components/InputGenerator";
import { useSignInController } from "providers/SignInProvider";
import ButtonGenerator from "components/ButtonGenerator";
import Title from "components/Title";
import Loader from "components/Loader";
import { Link } from "react-router-dom";
import { HideIcon, ShowIcon } from "components/svgIcons";
import Spinner from "components/Spinner";

const SignInForm: FC = () => {
  const { form, loading } = useSignInController();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  if (!form) {
    return <Loader />;
  }

  return (
    <div className={style["sign-in"]}>
      <div className={style["sign-in__head"]}>
        <Title component="h1" variant="h3" color="white" align="left">
          Welcome back
        </Title>
        <p className={style["sign-in__subheader"]}>
          First time here? <Link to="/register">Register</Link>
        </p>
      </div>

      <form onSubmit={form?.handleSubmit} onReset={form?.handleReset}>
        <FormBox>
          <InputGenerator
            type="text"
            label="Email"
            name="email"
            placeholder="Your Email"
            autoComplete="chrome-off"
            autoCorrect="false"
            value={form?.values.email}
            onChange={form?.handleChange}
            onBlur={form?.handleBlur}
            hasError={Boolean(form?.touched.email && form?.errors.email)}
            disabled={loading}
            maxLength={255}
          />
          {form && form.touched.email && form.errors.email ? (
            <FormError>{form.errors.email}</FormError>
          ) : null}
        </FormBox>
        <FormBox>
          <InputGenerator
            type={showPassword ? "text" : "password"}
            label="Password"
            name="pass"
            placeholder="Your Password"
            autoComplete="new-password"
            value={form?.values.pass}
            onChange={form?.handleChange}
            onBlur={form?.handleBlur}
            hasError={Boolean(form?.touched.pass && form?.errors.pass)}
            disabled={loading}
            inputBtn={
              <button
                type="button"
                className={style["sign-in__inputbtn"]}
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <HideIcon fill="#A8B4C0" />
                ) : (
                  <ShowIcon fill="#A8B4C0" />
                )}
              </button>
            }
            maxLength={255}
          />
          {form && form.touched.pass && form.errors.pass ? (
            <FormError>{form.errors.pass}</FormError>
          ) : null}
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            hidden
          />
        </FormBox>
        <ButtonGenerator
          type="submit"
          size="large"
          buttonStyle="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <Spinner /> : "Log In"}
        </ButtonGenerator>
      </form>
    </div>
  );
};

export default SignInForm;

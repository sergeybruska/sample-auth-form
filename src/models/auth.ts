import * as yup from 'yup';

export interface SignInModel {
  email: string;
  pass: string;
}

export const SignInModel_DEFAULT: SignInModel = {
  email: '',
  pass: '',
};

export const SignInModel_SCHEMA = yup.object<SignInModel>().shape({
  email: yup.string().email('Invalid email format').required('Email is required').matches(/^\S+@\S+\.\S+$/, 'Invalid email format'),
  pass: yup.string().required('Password is required').min(6, 'Min length is 6')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+|~=`{}[\]:";'<>?,./]).*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
    ),
});


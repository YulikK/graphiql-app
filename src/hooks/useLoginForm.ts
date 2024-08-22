import { yupResolver } from '@hookform/resolvers/yup';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { LoginForm } from '../models/types';
import {
  logInWithEmailAndPassword,
  loginWithGoogle,
} from '../services/firebase/auth';
import {
  AuthenticationLoading,
  SuccessLoginMessage,
  UnexpectedError,
} from '../utils/consts';

import { useCheckIsAuth } from './useCheckIsAuth';
import { useLoginValidationSchema } from './useLoginValidationSchema';

export const useLoginForm = () => {
  const validationSchema = useLoginValidationSchema();
  const router = useRouter();
  const { isLoggedIn, loading } = useCheckIsAuth();

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginForm) => {
    toast
      .promise(logInWithEmailAndPassword(data.email, data.password), {
        pending: AuthenticationLoading,
        success: SuccessLoginMessage,
        error: {
          render({ data }) {
            return data instanceof FirebaseError
              ? data.message
              : UnexpectedError;
          },
        },
      })
      .then(() => router.push('/'));
  };

  const onGoogleSubmit = async () => {
    toast
      .promise(loginWithGoogle, {
        pending: AuthenticationLoading,
        success: SuccessLoginMessage,
        error: {
          render({ data }) {
            return data instanceof FirebaseError
              ? data.message
              : UnexpectedError;
          },
        },
      })
      .then(() => router.push('/'));
  };

  return {
    isLoggedIn,
    loading,
    handleSubmit,
    onSubmit,
    onGoogleSubmit,
    control,
    isValid,
    errors,
  };
};

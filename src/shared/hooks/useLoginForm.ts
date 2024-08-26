import { yupResolver } from '@hookform/resolvers/yup';
import { FirebaseError } from 'firebase/app';
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

import { useLoginValidationSchema } from './useLoginValidationSchema';

export const useLoginForm = () => {
  const validationSchema = useLoginValidationSchema();

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginForm) => {
    toast.promise(logInWithEmailAndPassword(data.email, data.password), {
      pending: AuthenticationLoading,
      success: SuccessLoginMessage,
      error: {
        render({ data }) {
          if (data instanceof FirebaseError) {
            return data.message;
          }
          return 'An unexpected error occurred.';
        },
      },
    });
  };

  const onGoogleSubmit = async () => {
    toast.promise(loginWithGoogle, {
      pending: AuthenticationLoading,
      success: SuccessLoginMessage,
      error: {
        render({ data }) {
          return data instanceof FirebaseError ? data.message : UnexpectedError;
        },
      },
    });
  };

  return {
    handleSubmit,
    onSubmit,
    onGoogleSubmit,
    control,
    isValid,
    errors,
  };
};

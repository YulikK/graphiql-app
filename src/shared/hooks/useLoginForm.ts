import { yupResolver } from '@hookform/resolvers/yup';
import { FirebaseError } from 'firebase/app';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { LoginForm } from '../models/types';
import {
  logInWithEmailAndPassword,
  logInWithGoogle,
} from '../services/firebase/auth';

import { useLoginValidationSchema } from './useLoginValidationSchema';

export const useLoginForm = () => {
  const t = useTranslations('LoginPage');
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
      pending: t('authenticationLoading'),
      success: t('successLoginMessage'),
      error: {
        render({ data }) {
          return data instanceof FirebaseError
            ? data.message
            : t('unexpectedError');
        },
      },
    });
  };

  const onGoogleSubmit = async () => {
    toast.promise(logInWithGoogle, {
      pending: t('authenticationLoading'),
      success: t('successLoginMessage'),
      error: {
        render({ data }) {
          return data instanceof FirebaseError
            ? data.message
            : t('unexpectedError');
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

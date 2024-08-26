import { useTranslations } from 'next-intl';

import { yupResolver } from '@hookform/resolvers/yup';
import { FirebaseError } from 'firebase/app';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { LoginForm } from '@/shared/models/types';
import {
  logInWithEmailAndPassword,
  logInWithGoogle,
} from '@/shared/services/firebase/auth';

import { useLoginValidationSchema } from './use-login-validation-schema';

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
      pending: t('authentication-loading'),
      success: t('success-login-message'),
      error: {
        render({ data }) {
          return data instanceof FirebaseError
            ? data.message
            : t('unexpected-error');
        },
      },
    });
  };

  const onGoogleSubmit = async () => {
    toast.promise(logInWithGoogle, {
      pending: t('authentication-loading'),
      success: t('success-login-message'),
      error: {
        render({ data }) {
          return data instanceof FirebaseError
            ? data.message
            : t('unexpected-error');
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

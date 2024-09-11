import { useTranslations } from 'next-intl';

import { yupResolver } from '@hookform/resolvers/yup';
import { FirebaseError } from 'firebase/app';
import {
  Control,
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';

import { LoginForm } from '@/shared/models/types';
import {
  logInWithEmailAndPassword,
  logInWithGoogle,
} from '@/shared/services/firebase/auth';

import { useAlertBar } from '../contexts';
import { useLoginValidationSchema } from './use-login-validation-schema';

export const useLoginForm = (): UseLoginFormReturn => {
  const t = useTranslations('LoginPage');

  const validationSchema = useLoginValidationSchema();

  const { setError, setSuccess, setPending } = useAlertBar();

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setPending(t('authentication-loading'));
      await logInWithEmailAndPassword(data.email, data.password);
      setSuccess(t('success-login-message'));
    } catch (error) {
      setError((error as FirebaseError).message || t('unexpected-error'));
    }
  };

  const onGoogleSubmit = async () => {
    try {
      setPending(t('authentication-loading'));
      await logInWithGoogle();
      setSuccess(t('success-login-message'));
    } catch (error) {
      setError((error as FirebaseError).message || t('unexpected-error'));
    }
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

export type UseLoginFormReturn = {
  handleSubmit: UseFormHandleSubmit<LoginForm>;
  onSubmit: (data: LoginForm) => Promise<void>;
  onGoogleSubmit: () => Promise<void>;
  control: Control<LoginForm>;
  isValid: boolean;
  errors: FieldErrors<LoginForm>;
};

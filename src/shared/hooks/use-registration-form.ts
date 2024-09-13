import { useTranslations } from 'next-intl';

import { yupResolver } from '@hookform/resolvers/yup';
import { FirebaseError } from 'firebase/app';
import {
  Control,
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';

import { RegisterForm } from '@/shared/models/types';
import { registerWithEmailAndPassword } from '@/shared/services/firebase/auth';

import { useAlertBar } from '../contexts';

import { useRegistrationValidationSchema } from './use-registration-validation-schema';

export const useRegistrationForm = () => {
  const t = useTranslations('RegistrationPage');

  const validationSchema = useRegistrationValidationSchema();

  const { setError, setSuccess, setPending } = useAlertBar();

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setPending(t('authentication-loading'));
      await registerWithEmailAndPassword(data.name, data.email, data.password);
      setSuccess(t('success-register-message'));
    } catch (error) {
      setError((error as FirebaseError).message || t('unexpected-error'));
    }
  };

  return {
    handleSubmit,
    onSubmit,
    control,
    isValid,
    errors,
  };
};

export type useRegistrationFormReturn = {
  handleSubmit: UseFormHandleSubmit<RegisterForm>;
  onSubmit: (data: RegisterForm) => Promise<void>;
  onGoogleSubmit: () => Promise<void>;
  control: Control<RegisterForm>;
  isValid: boolean;
  errors: FieldErrors<RegisterForm>;
};

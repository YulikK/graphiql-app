import { useTranslations } from 'next-intl';

import { yupResolver } from '@hookform/resolvers/yup';
import { FirebaseError } from 'firebase/app';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { RegisterForm } from '@/shared/models/types';
import { registerWithEmailAndPassword } from '@/shared/services/firebase/auth';

import { useRegistrationValidationSchema } from './use-registration-validation-schema';

export const useRegistrationForm = () => {
  const t = useTranslations('RegistrationPage');

  const validationSchema = useRegistrationValidationSchema();

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterForm) => {
    toast.promise(
      registerWithEmailAndPassword(data.name, data.email, data.password),
      {
        pending: t('authentication-loading'),
        success: t('success-register-message'),
        error: {
          render({ data }) {
            return data instanceof FirebaseError
              ? data.message
              : t('unexpected-error');
          },
        },
      }
    );
  };

  return {
    handleSubmit,
    onSubmit,
    control,
    isValid,
    errors,
  };
};

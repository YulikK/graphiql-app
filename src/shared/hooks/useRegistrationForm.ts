import { yupResolver } from '@hookform/resolvers/yup';
import { FirebaseError } from 'firebase/app';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useRegistrationValidationSchema } from './useRegistrationValidationSchema';

import { RegisterForm } from '@/shared/models/types';
import { registerWithEmailAndPassword } from '@/shared/services/firebase/auth';

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
        pending: t('authenticationLoading'),
        success: t('successRegisterMessage'),
        error: {
          render({ data }) {
            return data instanceof FirebaseError
              ? data.message
              : t('unexpectedError');
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

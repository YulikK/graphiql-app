import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { RegisterForm } from '../models/types';
import { registerWithEmailAndPassword } from '../services/firebase/auth';

import { useCheckIsAuth } from './useCheckIsAuth';
import { useRegistrationValidationSchema } from './useRegistrationValidationSchema';

export const useRegistrationForm = () => {
  const validationSchema = useRegistrationValidationSchema();
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

  const onSubmit = async (data: RegisterForm) => {
    const result = await registerWithEmailAndPassword(
      data.name,
      data.email,
      data.password
    );
    if (result) {
      router.push('/');
    }
  };

  return {
    isLoggedIn,
    loading,
    handleSubmit,
    onSubmit,
    control,
    isValid,
    errors,
  };
};

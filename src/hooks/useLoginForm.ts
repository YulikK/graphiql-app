import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { LoginForm } from '../models/types';
import { logInWithEmailAndPassword } from '../services/firebase/auth';

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
    const result = await logInWithEmailAndPassword(data.email, data.password);
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

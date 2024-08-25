import { yupResolver } from '@hookform/resolvers/yup';
import { FirebaseError } from 'firebase/app';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { RegisterForm } from '../models/types';
import { registerWithEmailAndPassword } from '../services/firebase/auth';
import {
  AuthenticationLoading,
  SuccessRegisterMessage,
  UnexpectedError,
} from '../utils/consts';

import { useRegistrationValidationSchema } from './useRegistrationValidationSchema';

export const useRegistrationForm = () => {
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
        pending: AuthenticationLoading,
        success: SuccessRegisterMessage,
        error: {
          render({ data }) {
            return data instanceof FirebaseError
              ? data.message
              : UnexpectedError;
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

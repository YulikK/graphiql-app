'use client';

import { useTranslations } from 'next-intl';

import * as yup from 'yup';

import {
  passwordMinLength,
  passwordStrengthRegex,
  validEmailRegExp,
} from './validation-consts';

export const useLoginValidationSchema = () => {
  const t = useTranslations('Validation');

  return yup.object().shape({
    email: yup
      .string()
      .required(t('email-required'))
      .matches(validEmailRegExp, t('email-invalid')),

    password: yup
      .string()
      .required(t('password-required'))
      .min(
        passwordMinLength,
        t('password-min-length', { min: passwordMinLength })
      )
      .matches(passwordStrengthRegex, t('password-strength')),
  });
};

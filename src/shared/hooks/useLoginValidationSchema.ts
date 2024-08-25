'use client';

import { useTranslations } from 'next-intl';
import * as yup from 'yup';

import {
  validEmailRegExp,
  passwordMinLength,
  passwordStrengthRegex,
} from '../utils/consts';

export const useLoginValidationSchema = () => {
  const t = useTranslations('Validation');

  return yup.object().shape({
    email: yup
      .string()
      .required(t('emailRequired'))
      .matches(validEmailRegExp, t('emailInvalid')),

    password: yup
      .string()
      .required(t('passwordRequired'))
      .min(
        passwordMinLength,
        t('passwordMinLength', { min: passwordMinLength })
      )
      .matches(passwordStrengthRegex, t('passwordStrength')),
  });
};

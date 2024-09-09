'use client';

import { useTranslations } from 'next-intl';

import * as yup from 'yup';

import {
  passwordMinLength,
  passwordStrengthRegex,
  validEmailRegExp,
} from './validation-consts';

export const useRegistrationValidationSchema = () => {
  const t = useTranslations('Validation');

  return yup.object().shape({
    name: yup
      .string()
      .test('is-capitalized', t('name-capitalized'), value => {
        if (!value) return false;

        return value[0] === value[0].toUpperCase();
      })
      .required(t('name-required')),

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

    confirmPassword: yup
      .string()
      .required(t('confirm-password-required'))
      .oneOf([yup.ref('password')], t('passwords-must-match'))
      .matches(passwordStrengthRegex, t('password-strength')),

    acceptTerms: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions'),
  });
};

'use client';

import { useTranslations } from 'next-intl';
import * as yup from 'yup';

import {
  validEmailRegExp,
  passwordMinLength,
  passwordStrengthRegex,
} from '../utils/consts';

export const useRegistrationValidationSchema = () => {
  const t = useTranslations('Validation');

  return yup.object().shape({
    name: yup
      .string()
      .test('is-capitalized', t('nameCapitalized'), (value) => {
        if (!value) return false;
        return value[0] === value[0].toUpperCase();
      })
      .required(t('nameRequired')),

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

    confirmPassword: yup
      .string()
      .required(t('confirmPasswordRequired'))
      .oneOf([yup.ref('password')], t('passwordsMustMatch'))
      .matches(passwordStrengthRegex, t('passwordStrength')),

    acceptTerms: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions'),
  });
};

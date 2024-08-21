import { useTranslations } from 'next-intl';
import * as yup from 'yup';

const validEmailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordStrengthRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])(?=.*[\p{S}\p{P}\p{M}\p{N}]).{8,}$/u;

const passwordMinLength = 8;

export const useValidationSchema = () => {
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
  });
};

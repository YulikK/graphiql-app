import { ChangeEvent } from 'react';
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

export interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register?: UseFormRegister<T>;
  type?: string;
  error?: FieldError;
  autocomplete?: string | undefined;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  watch?: UseFormWatch<T>;
  value?: string;
}

export interface ValidationErrors {
  email?: FieldError;
  password?: FieldError;
  confirmPassword?: FieldError;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export type LoginForm = Pick<RegisterForm, 'email' | 'password'>;

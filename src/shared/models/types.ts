import { ChangeEvent } from 'react';
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

import { HttpMethodType } from './http-methods';

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

export type RestRequestType = 'rest';

export type RestSliceType = {
  url: string;
  query: string[][];
  body: string;
  method: HttpMethodType;
  headers: string[][];
  variables: string[][];
  textMode: boolean;
};

export type SavedRestRequest = RestSliceType & {
  type: RestRequestType;
  status: number;
  id: string;
  browserUrl: string;
};

export type GraphqlRequestType = 'graphql';

export type GraphqlSliceType = {
  url: string;
  urlDoc: string;
  query: string;
  schema: string;
  isTrySchemaDownload: boolean;
  headers: string[][];
  variables: string;
};

export type SavedGraphqlRequest = GraphqlSliceType & {
  type: GraphqlRequestType;
  status: number;
  id: string;
  browserUrl: string;
};

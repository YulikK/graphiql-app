export const validEmailRegExp =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const passwordStrengthRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])(?=.*[\p{S}\p{P}\p{M}\p{N}]).{8,}$/u;

export const passwordMinLength = 8;

export const SuccessLoginMessage =
  'Congratulations, you have successfully logged in!';

export const SuccessRegisterMessage =
  'Congratulations, you have successfully register!';

export const SuccessLogoutMessage =
  'Congratulations, you have successfully log out!';

export const AuthenticationLoading = 'Wait, your authentication in progress';

export const UnexpectedError = 'An unexpected error occurred.';

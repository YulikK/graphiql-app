export const validEmailRegExp =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const passwordStrengthRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])(?=.*[\p{S}\p{P}\p{M}\p{N}]).{8,}$/u;

export const passwordMinLength = 8;

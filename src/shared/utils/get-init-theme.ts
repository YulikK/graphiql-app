export function getInitialTheme(headers: Headers) {
  const prefersDarkMode = headers.get('sec-ch-prefers-color-scheme') === 'dark';

  return prefersDarkMode ? 'dark' : 'light';
}

export default function replaceUrl(url?: string) {
  if (!url) return;

  window.history.replaceState(null, '', url);
}

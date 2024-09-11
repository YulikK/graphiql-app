export default function replaceUrl(url?: string) {
  if (url) {
    window.history.replaceState(null, '', url);
  }
}

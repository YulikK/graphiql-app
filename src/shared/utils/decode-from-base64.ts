export default function decodeFromBase64(value: string) {
  const base64Standard = value.replace(/-/g, '+').replace(/_/g, '/');

  const binaryString = Buffer.from(base64Standard, 'base64').toString('binary');

  return decodeURIComponent(
    Array.prototype.map
      .call(binaryString, (c: string) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
}

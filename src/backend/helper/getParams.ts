export const getParams = (url: string): Record<string, string> => {
  const params = new URLSearchParams(new URL(url).search);
  const obj: Record<string, string> = {};
  for (const param of params) {
    obj[param[0]] = param[1];
  }
  return obj;
};

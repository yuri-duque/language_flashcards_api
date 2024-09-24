export const stringInject = (str: string, data: Record<string, string>) => {
  return str.replace(/<<\s*([\w.]+)\s*>>/g, function (_, key) {
    return data[key] || '';
  });
};

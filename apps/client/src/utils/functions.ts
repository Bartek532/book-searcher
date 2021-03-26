export const prepareQueryToSearch = (query: string) => {
  return encodeURIComponent(query.trim());
};

export const getKeyByValue = (
  value: string,
  object: Record<string, string>,
) => {
  for (const prop in object) {
    if (object[prop] === value) return prop;
  }
};

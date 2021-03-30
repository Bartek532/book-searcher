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

export const buildAdvancedQuery = (
  tags: string[],
  author?: string,
  name?: string,
) => {
  return `tags=${tags.join("+")}${
    name ? "&name=" + prepareQueryToSearch(name) : ""
  }${author ? "&author=" + prepareQueryToSearch(author) : ""}`;
};

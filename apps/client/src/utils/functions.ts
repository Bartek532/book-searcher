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

export const isInViewport = (element: HTMLElement | Element) => {
  const rect = element.getBoundingClientRect();
  const html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
};

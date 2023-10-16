export const kebabCase = (str: string): string => {
  return (
    str
      // Match uppercase letters, numbers, and words
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
      )
      // Convert matched segments to lowercase and join with hyphens
      ?.map((x) => x.toLowerCase())
      .join('-') || ''
  );
};

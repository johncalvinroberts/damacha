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

export const hhmmss = (n: number) => {
  const hours = Math.floor(n / 3600);
  let mins = '0' + Math.floor((n % 3600) / 60);
  let secs = '0' + Math.floor(n % 60);

  mins = mins.substring(mins.length - 2);
  secs = secs.substring(secs.length - 2);

  if (!isNaN(parseInt(secs))) {
    return hours ? `${hours}:${mins}:${secs}` : `${mins}:${secs}`;
  } else {
    return '00:00';
  }
};

export const getRandomUnicodeString = (length: number): string => {
  const array = new Uint16Array(length);
  window.crypto.getRandomValues(array);
  let str = '';
  for (var i = 0; i < array.length; i++) {
    str += String.fromCharCode(array[i]);
  }
  return str;
};

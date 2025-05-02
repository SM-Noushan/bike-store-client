export const splitString = (str: string): string => {
  const result = str.includes("sports")
    ? `${str.split("sports")[0]} Sports`
    : str;
  return result.charAt(0).toUpperCase() + result.slice(1);
};

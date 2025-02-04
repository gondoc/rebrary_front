export const isEqual = (value1: string, value2: string): boolean => {
  return JSON.stringify(value1) === JSON.stringify(value2);
};

export const isNumeric = (typing: string) => {
  return typing.trim() !== "" && !isNaN(Number(typing.trim()));
};

export const typingNumCheck = (key: string) => {
  const checkRegex: RegExp = /[^0-9]/g;
  return key.replace(checkRegex, "");
};

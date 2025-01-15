export const isEqual = (value1: string, value2: string): boolean => {
  return JSON.stringify(value1) === JSON.stringify(value2);
};

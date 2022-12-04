/**
 * Generate Random Text
 * @param length
 * @returns
 */
export const generateRandomText = (length: number = 6) => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
};

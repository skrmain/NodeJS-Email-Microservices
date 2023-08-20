/**
 * Generate Random Text
 * @param length
 * @returns
 */
export const generateRandomText = (length = 6) => {
    return Math.random()
        .toString(36)
        .substring(2, 2 + length);
};

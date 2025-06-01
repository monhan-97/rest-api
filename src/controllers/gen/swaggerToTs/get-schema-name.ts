export const getSchemaName = (path: string): string => {
  return path.slice(Math.max(0, path.lastIndexOf('/') + 1));
};

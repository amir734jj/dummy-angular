export const jwtExpToDate = (exp: number) => {
  return new Date(exp * 1000)
};

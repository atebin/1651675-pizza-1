export const costFormat = (cost) => {
  let result = Math.round(cost);
  result = new Intl.NumberFormat("ru-RU").format(result);

  return result;
};

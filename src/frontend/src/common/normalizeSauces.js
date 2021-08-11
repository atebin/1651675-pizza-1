const mapNameCode = {
  Томатный: { code: "tomato", checkedDefault: true },
  Сливочный: { code: "creamy", checkedDefault: false },
};

export const normalizeSauces = (sauces) =>
  sauces
    .filter(({ name }) => {
      return name in mapNameCode;
    })
    .map(({ name, price }) => {
      return {
        name,
        price,
        code: mapNameCode[name].code,
        isChecked: mapNameCode[name].checkedDefault,
      };
    });

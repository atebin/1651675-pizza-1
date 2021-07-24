const mapNameCode = {
  Тонкое: { code: "light", checkedDefault: false },
  Толстое: { code: "large", checkedDefault: true },
};

export const normalizeDough = (dough) =>
  dough
    .filter(({ name }) => {
      return name in mapNameCode;
    })
    .map(({ name, image, description, price }) => {
      return {
        name,
        image,
        description,
        price,
        code: mapNameCode[name].code,
        isChecked: mapNameCode[name].checkedDefault,
      };
    });

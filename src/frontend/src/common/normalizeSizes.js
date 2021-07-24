const mapNameCode = {
  "23 см": { code: "small", checkedDefault: false },
  "32 см": { code: "normal", checkedDefault: true },
  "45 см": { code: "big", checkedDefault: false },
};

export const normalizeSizes = (sizes) =>
  sizes
    .filter(({ name }) => {
      return name in mapNameCode;
    })
    .map(({ name, image, multiplier }) => {
      return {
        name,
        image,
        multiplier,
        code: mapNameCode[name].code,
        isChecked: mapNameCode[name].checkedDefault,
      };
    });

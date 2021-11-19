const mapNameCode = {
  "Cola-Cola 0,5 литра": { code: "cola", value: 0 },
  "Острый соус": { code: "sauce", value: 0 },
  "Картошка из печи": { code: "potato", value: 0 },
};

export const normalizeMisc = (misc) =>
  misc
    .filter(({ name }) => {
      return name in mapNameCode;
    })
    .map(({ name, image, price }) => {
      return {
        name,
        image,
        //image: `img/${mapNameCode[name].code}.svg`,
        price,
        code: mapNameCode[name].code,
        value: mapNameCode[name].value,
      };
    });

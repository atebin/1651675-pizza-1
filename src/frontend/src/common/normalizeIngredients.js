const mapNameCode = {
  Грибы: { code: "mushrooms", value: 0 },
  Чеддер: { code: "cheddar", value: 0 },
  Салями: { code: "salami", value: 0 },
  Ветчина: { code: "ham", value: 0 },
  Ананас: { code: "ananas", value: 0 },
  Бекон: { code: "bacon", value: 0 },
  Лук: { code: "onion", value: 0 },
  Чили: { code: "chile", value: 0 },
  Халапеньо: { code: "jalapeno", value: 0 },
  Маслины: { code: "olives", value: 0 },
  Томаты: { code: "tomatoes", value: 0 },
  Лосось: { code: "salmon", value: 0 },
  Моцарелла: { code: "mozzarella", value: 0 },
  Пармезан: { code: "parmesan", value: 0 },
  "Блю чиз": { code: "blue_cheese", value: 0 },
};

export const normalizeIngredients = (ingredients) =>
  ingredients
    .filter(({ name }) => {
      return name in mapNameCode;
    })
    .map(({ name, image, price }) => {
      return {
        name,
        image,
        price,
        code: mapNameCode[name].code,
        value: mapNameCode[name].value,
      };
    });

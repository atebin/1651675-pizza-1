/* eslint-disable */
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
/* eslint-enable */

const rules = {
  isNotEmpty: {
    //rule: value => !!value?.trim(),
    rule: (value) => !!value?.trim(),
    message: "Поле не заполнено",
  },
  required: {
    //rule: value => !!value?.trim(),
    rule: (value) => !!value?.trim(),
    message: "Поле обязательно для заполнения",
  },
  email: {
    //rule: value => !!value
    rule: (value) =>
      value ? emailRegex.test(String(value).toLowerCase()) : true,
    message: "Электроная почта имеет неверный формат",
  },
  url: {
    //rule: value => !(!value ? urlRegex.test(value) : true),
    rule: (value) => !(!value ? urlRegex.test(value) : true),
    message: "Ссылка имеет неверный формат",
  },
};

/*
 --- @param { String } value
 --- @param { String[] } appliedRules
 --- @returns {string}
*/

const validator = (value, appliedRules) => {
  let error = "";
  appliedRules.forEach((appliedRule) => {
    if (!rules[appliedRule]) {
      return;
    }
    const { rule, message } = rules[appliedRule];
    if (!rule(value)) {
      error = message;
    }
  });
  return error;
};

export default {
  methods: {
    $validateFields(fields, validations) {
      let isValid = true;
      Object.keys(validations).forEach((key) => {
        //validations[key].error = validator(fields[key], validations[key].rules);
        this.$set(
          validations[key],
          "error",
          validator(fields[key], validations[key].rules)
        );
        if (validations[key].error) {
          isValid = false;
        }
      });
      return isValid;
    },
    $clearValidationErrors() {
      if (!this.validations) {
        return;
      }
      Object.keys(this.validations).forEach((key) => {
        this.$set(this.validations[key], "error", "");
      });
    },
  },
};

export const normalizeUser = ({ name, email, password, phone }) => {
  let userId = "user5";

  return {
    id: userId,
    avatar: {
      webp: require(`@/assets/img/users/${userId}.webp`),
      jpg1x: require(`@/assets/img/users/${userId}.jpg`),
      jpg2x: require(`@/assets/img/users/${userId}@2x.jpg`),
    },
    name,
    email,
    password,
    phone,
  };
};

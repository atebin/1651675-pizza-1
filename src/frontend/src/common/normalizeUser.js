import { USER_ID_FOR_AVATAR } from "@/common/constants.js";

export const normalizeUser = ({ id, name, email, phone }) => {
  let userIdForAvatar = USER_ID_FOR_AVATAR;

  return {
    id,
    name,
    email,
    phone,
    avatar: {
      webp: require(`@/assets/img/users/${userIdForAvatar}.webp`),
      jpg1x: require(`@/assets/img/users/${userIdForAvatar}.jpg`),
      jpg2x: require(`@/assets/img/users/${userIdForAvatar}@2x.jpg`),
    },
  };
};

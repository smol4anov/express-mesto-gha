const defaultUserName = 'Жак-Ив Кусто';
const defaultUserAbout = 'Исследователь';
const defaultUserAvatar = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

const SECRET_KEY = 'dea640c7500326e0e47398195ca5aa88e46252072e41611b8a7f4aa4da07bcb8';

const rexExpUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&/=]*)/;

module.exports = {
  defaultUserName,
  defaultUserAbout,
  defaultUserAvatar,
  SECRET_KEY,
  rexExpUrl,
};

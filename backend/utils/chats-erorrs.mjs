export const ERRORS = {
  getChatErrors: {
    401: "У данного пользователя нет чатов",
    500: "Ошибка в получении чатов, попробуйте позднее",
  },
  createChatErrors: {
    401: "Такой чат уже существует",
    500: "Ошибка при создании чата, попробуйте позднее",
  },
  deleteChatErrors: {
    401: "Такой чат не существует",
    500: "Ошибка при удаление чата, попробуйте позднее",
  },
  registrationErrors: {
    401: "Такой пользователь уже существует",
    403: "Некорректно указан email",
    500: "Ошибка регистрации, попробуйте позднее",
  },
  loginErrors: {
    403: "Неверный логин или пароль",
    401: "Такого пользователя не сущетсвует",
    500: "Ошибка авторизации, попробуйте позднее",
  },
  userErrors: {
    401: "Такого пользователя не сущетсвует",
    500: "Ошибка получения пользователей, попробуйте позднее",
  },
  updateUserErrors: {
    401: "Такого пользователя не сущетсвует",
    500: "Ошибка получения пользователей, попробуйте позднее",
  },
  messageErrors: {
    401: "В данном чате нет сообщений",
    403: "У данного автора нет соответсвующего чата",
    500: "Ошибка при работе с сообщениями, попробуйте позднее",
  },
};

# Backend Testing

## Prerequisites
Before running the tests, ensure that you have the following installed:

1. Node.js
2. NPM
3. Any additional software or packages that may be required by your application (like jest for testing, etc.)


# Тестирование WebSocket API с Postman
Шаг 1: Запустите проект с помощью команды npm run start
Шаг 2: Получите токен авторизации через Swagger Rest API по ссылке http://localhost:8000/rest-docs/
Шаг 3: Откройте [мою коллекцию в Postman](https://web.postman.co/workspace/My-Workspace~43834fae-8045-4133-8b4b-bccc05730228/collection/66cc8a2c4adb742250fe4c8e?action=share&source=copy-link&creator=37920129).
Шаг 4: Напишите мне в директ и пришлите мне свой email, с которого вы зарегистрировались в Postman, для предоставления вам доступа к тестированию.
Шаг 5: Вставьте полученный токен в шаге 2 во вкладку "Headers" вашего запроса WebSocket в Postman. Заполните поле ключа наименованием Authorization, а значение должно быть Bearer + пробел + токен. Например: Bearer 123abc.
Шаг 6: Создайте 2 аккаунта и чат в вашем приложении (если вы тестируете создание чата, то требуется только создание 2х аккаунтов, так как чат создается между 2мя пользователями).
Шаг 7: В постоянном подключении к WebSocket в Postman введите следующее тело сообщения:
    Для тестирования отправки / получения сообщения:
     {
        "type": "message",
        "message": {
            "authorId": "Ваш_айди",
            "chatId": "Айди_чата",
            "messageBody": "Привет, это тестовое сообщение"
        }
     }
     где authorId - это ID вашего аккаунта, chatId - это ID чата, в который вы отправляете сообщение, а messageBody - это само текстовое сообщение.

    Для тестирования создания чата:
     {
        "type": "chat",
        "chat": {
            "authorId": "Ваш_айди",
            "participantsIds": ["Айди_участника_1", "Айди_участника_2"],
            "chatType": "p2p"
        }
    }
    где authorId - это ID вашего аккаунта, participantsIds - это массив ID участников чата, а chatType - это тип чата (p2p - один на один, group - групповой).


Шаг 8: После отправки сообщения через Postman, убедитесь, что сообщение успешно обрабатывается сервером. Вы можете проверить это, просматривая логи сервера или базу данных на предмет наличия нового сообщения, если данные сохраняются при получении сообщения.

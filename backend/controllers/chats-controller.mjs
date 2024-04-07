import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";
/**
 * @swagger
 * /chat/create-chat:
 *   post:
 *     summary: Создание чата
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authorId:
 *                 type: string
 *               participantsId:
 *                 type: array
 *                 items:
 *                   type: string

 *     responses:
 *       200:
 *         description: Успешное создание чата
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chatId:
 *                   type: string
 *                   description: ID созданного чата
 *       401:
 *         description: Такой чат уже существует
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Сообщение об ошибке
 *       500:
 *         description: Ошибка при создании чата
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   description: Сообщение об ошибке при создании чата
 */

/**
 * @swagger
 * /chat/delete-chat:
 *   post:
 *     summary: Удаление чата
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chatId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешное удаление чата
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Чат удален успешно
 *       401:
 *         description: Такой чат не существует
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Сообщение об ошибке
 *       500:
 *         description: Ошибка при удалении чата
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   description: Сообщение об ошибке при удален и чата
 */

export class ChatsController {
  #chatService = diContainer.resolve(SERVICES.chat);

  deleteChat(req, res) {
    const { chatId } = req.body;

    try {
      this.#chatService.deleteChat(chatId);
      return res.status(200).json({ message: "Чат удален успешно" });
    } catch {
      return res
        .status(500)
        .json({ message: "Ошибка при удалении чата, попробуйте позднее" });
    }
  }

  createChat(req, res) {
    const { authorId, participantsId } = req.body;
    try {
      const chatId = this.#chatService.createChat(authorId, participantsId);
      return res.status(200).json({ chatId });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Ошибка при создании чата, попробуйте позднее" });
    }
  }
}

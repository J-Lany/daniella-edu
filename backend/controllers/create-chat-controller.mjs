import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";
/**
 * @swagger
 * /createNewChat:
 *   post:
 *     summary: Создание чата
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *               participants:
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
 *                 message:
 *                   type: string
 *                   description: Чат создан успешно
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

export function createChatController(req, res) {
  const chatService = diContainer.resolve(SERVICES.chat);
  const { sessionId, participants } = req.body;

  try {
    chatService.createChat(sessionId, participants);
    return res.status(200).json({ message: "Чат создан успешно" });
  } catch {
    return res
      .status(500)
      .json({ message: "Ошибка при создании чата, попробуйте позднее" });
  }
}

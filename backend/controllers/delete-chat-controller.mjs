import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";
/**
 * @swagger
 * /chat/deleteChat:
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

export function deleteChatController(req, res) {
  const chatService = diContainer.resolve(SERVICES.chat);
  const { chatId } = req.body;

  try {
    chatService.deleteChat(chatId);
    return res.status(200).json({ message: "Чат удален успешно" });
  } catch {
    return res
      .status(500)
      .json({ message: "Ошибка при удалении чата, попробуйте позднее" });
  }
}

import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Регистрация в месседжере
 *     parameters:
 *       - in: path
 *         name: login
 *         required: true
 *         schema:
 *           type: string
 *      - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *      - in: path
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Сообщение об успешной регистрации
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   author:
 *                     type: string
 *                     description: Автор сообщения
 *                   message:
 *                     type: string
 *                     description: Текст сообщения
 */
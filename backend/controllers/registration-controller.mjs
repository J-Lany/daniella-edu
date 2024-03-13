import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";

/**
 * @swagger
 * /registration:
 *   post:
 *     summary: Регистрация в месседжере
 *     parameters:
 *       - in: body
 *         name: login
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешная регистрация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 login:
 *                   type: string
 *                   description: Логин
 *                 message:
 *                   type: string
 *                   description: Информация о результате
 *       401:
 *         description: Такой пользователь уже существует
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Сообщение об ошибке
 */


export function registrationController(req, res) {

}
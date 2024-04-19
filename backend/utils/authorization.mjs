import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";

export async function authorization(req, res, next) {
  const authService = diContainer.resolve(SERVICES.auth);
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    res.sendStatus(401);
  }
  const token = authorizationHeader.substring(7);
  if (await authService.isAuth(token)) {
    next();
  } else {
    return res.sendStatus(403);
  }
}

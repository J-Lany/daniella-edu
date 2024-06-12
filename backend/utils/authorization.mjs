import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";

const TOKEN_PREFIX = "Bearer ";
export async function authorization(req, res, next) {
  const authService = diContainer.resolve(SERVICES.auth);
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith(TOKEN_PREFIX)) {
    res.sendStatus(401);
  }
  const token = authorizationHeader.substring(7);
  const isAuth = await authService.isAuth(token)
  
  if (isAuth) {
    next();
  } else {
    return res.sendStatus(401);
  }
}

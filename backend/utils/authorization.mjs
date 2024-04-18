import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";

export function authorization(req, res, next) {
  const authService = diContainer.resolve(SERVICES.auth);
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    res.sendStatus(401);
  }
  if (authService.isAuth(authorizationHeader)) {
    next();
  } else {
    return res.sendStatus(403); 
  }
}
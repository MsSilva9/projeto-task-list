import { Router } from "express";

import authenticationController from "./controllers/authentication.controller";
import usersController from "./controllers/users.controller";

const router = Router();

router.post("/authenticate", authenticationController.authenticate);

router.post("/users", usersController.store);

export default router;
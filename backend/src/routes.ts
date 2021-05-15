import { Router } from "express";

import authenticationMiddleware from "./middlewares/authentication.middleware"

import authenticationController from "./controllers/authentication.controller";
import usersController from "./controllers/users.controller";
import tasksController from "./controllers/tasks.controller";

const router = Router();

router.post("/authenticate", authenticationController.authenticate);

router.post("/users", usersController.store);
router.get("/users/:id", authenticationMiddleware, usersController.show);

router.post("/tasks", authenticationMiddleware, tasksController.store);
router.get("/tasks", authenticationMiddleware, tasksController.index);
router.get("/tasks/:id", authenticationMiddleware, tasksController.show);

export default router;
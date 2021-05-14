import "dotenv/config";
import express from "express";

import routes from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3030, () => console.log("\nServer running on port 3030\n"));

// requisicao(front) <=> rota <=> controller <=> repository <=> banco
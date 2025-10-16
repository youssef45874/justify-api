import * as express from "express";
import { tokenRouter } from "./routes/token";
import { justifyRouter } from "./routes/justify";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.text());

app.use("/api/token", tokenRouter);
app.use("/api/justify", justifyRouter);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

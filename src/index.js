"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const token_1 = require("./routes/token");
const justify_1 = require("./routes/justify");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.text());
app.use("/api/token", token_1.tokenRouter);
app.use("/api/justify", justify_1.justifyRouter);
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map
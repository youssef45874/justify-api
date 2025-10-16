"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justifyRouter = void 0;
const express_1 = require("express");
const justifyText_1 = require("../services/justifyText");
const tokenStore_1 = require("../utils/tokenStore");
exports.justifyRouter = (0, express_1.Router)();
exports.justifyRouter.post("/", (req, res) => {
    const auth = req.headers.authorization;
    if (!auth)
        return res.status(401).send("Token manquant");
    const token = typeof auth === "string"
        ? (auth.startsWith("Bearer ") ? auth.slice(7) : auth)
        : "";
    if (!(0, tokenStore_1.verifyToken)(token))
        return res.status(401).send("Token invalide");
    const text = req.body;
    if (!text || typeof text !== "string")
        return res.status(400).send("Texte manquant");
    const words = text.trim().split(/\s+/).length;
    const allowed = (0, tokenStore_1.addWordCount)(token, words);
    if (!allowed)
        return res.status(402).send("Quota journalier dépassé (80 000 mots)");
    const justified = (0, justifyText_1.justifyText)(text);
    res.type("text/plain").send(justified);
});

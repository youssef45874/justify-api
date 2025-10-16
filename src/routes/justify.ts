import { Router } from "express";
import { justifyText } from "../services/justifyText";
import { verifyToken, addWordCount } from "../utils/tokenStore";

export const justifyRouter = Router();

justifyRouter.post("/", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).send("Token manquant");

  const token = typeof auth === "string"
    ? (auth.startsWith("Bearer ") ? auth.slice(7) : auth)
    : "";
  if (!verifyToken(token)) return res.status(401).send("Token invalide");

  const text = req.body;
  if (!text || typeof text !== "string")
    return res.status(400).send("Texte manquant");

  const words = text.trim().split(/\s+/).length;
  const allowed = addWordCount(token, words);
  if (!allowed) return res.status(402).send("Quota journalier dépassé (80 000 mots)");

  const justified = justifyText(text);
  res.type("text/plain").send(justified);
});

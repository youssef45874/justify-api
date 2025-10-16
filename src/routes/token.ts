import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { saveToken } from "../utils/tokenStore";

export const tokenRouter = Router();

tokenRouter.post("/", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email requis" });

  const token = uuidv4();
  saveToken(token, email);
  res.json({ token });
});

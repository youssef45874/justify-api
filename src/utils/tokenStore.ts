import * as fs from "fs";
import * as path from "path";

export interface TokenData {
  email: string;
  usedWords: number;
  date: string;
}

const filePath = path.join(__dirname, "../../tokens.json");

function loadTokens(): Record<string, TokenData> {
  if (!fs.existsSync(filePath)) return {};
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    if (!data) return {};
    return JSON.parse(data) as Record<string, TokenData>;
  } catch (err) {
    // If file is corrupt, reset it
    fs.writeFileSync(filePath, JSON.stringify({}));
    return {};
  }
}

function saveTokens(tokens: Record<string, TokenData>): void {
  fs.writeFileSync(filePath, JSON.stringify(tokens, null, 2));
}

export function saveToken(token: string, email: string) {
  const tokens = loadTokens();
  tokens[token] = { email, usedWords: 0, date: new Date().toDateString() };
  saveTokens(tokens);
}

export function verifyToken(token: string): boolean {
  const tokens = loadTokens();
  return !!tokens[token];
}

export function addWordCount(token: string, count: number): boolean {
  const tokens = loadTokens();
  const t = tokens[token];
  if (!t) return false;

  const today = new Date().toDateString();
  if (t.date !== today) {
    t.usedWords = 0;
    t.date = today;
  }

  if (t.usedWords + count > 80000) return false;
  t.usedWords += count;
  saveTokens(tokens);
  return true;
}

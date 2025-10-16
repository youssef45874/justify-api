"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToken = saveToken;
exports.verifyToken = verifyToken;
exports.addWordCount = addWordCount;
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../../tokens.json");
function loadTokens() {
    if (!fs.existsSync(filePath))
        return {};
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        if (!data)
            return {};
        return JSON.parse(data);
    }
    catch (err) {
        // If file is corrupt, reset it
        fs.writeFileSync(filePath, JSON.stringify({}));
        return {};
    }
}
function saveTokens(tokens) {
    fs.writeFileSync(filePath, JSON.stringify(tokens, null, 2));
}
function saveToken(token, email) {
    const tokens = loadTokens();
    tokens[token] = { email, usedWords: 0, date: new Date().toDateString() };
    saveTokens(tokens);
}
function verifyToken(token) {
    const tokens = loadTokens();
    return !!tokens[token];
}
function addWordCount(token, count) {
    const tokens = loadTokens();
    const t = tokens[token];
    if (!t)
        return false;
    const today = new Date().toDateString();
    if (t.date !== today) {
        t.usedWords = 0;
        t.date = today;
    }
    if (t.usedWords + count > 80000)
        return false;
    t.usedWords += count;
    saveTokens(tokens);
    return true;
}
//# sourceMappingURL=tokenStore.js.map
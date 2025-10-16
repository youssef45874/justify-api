"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToken = saveToken;
exports.verifyToken = verifyToken;
exports.addWordCount = addWordCount;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
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

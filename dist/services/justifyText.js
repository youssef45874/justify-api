"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justifyText = justifyText;
function justifyText(text) {
    const words = text.trim().split(/\s+/);
    const lines = [];
    let lineWords = [];
    let lineLength = 0;
    const MAX = 80;
    for (const word of words) {
        if (lineLength + word.length + lineWords.length > MAX) {
            lines.push(justifyLine(lineWords, MAX));
            lineWords = [word];
            lineLength = word.length;
        }
        else {
            lineWords.push(word);
            lineLength += word.length;
        }
    }
    if (lineWords.length)
        lines.push(justifyLine(lineWords, MAX));
    return lines.join("\n");
}
function justifyLine(words, maxWidth) {
    if (words.length === 1) {
        // pad single word to the maxWidth (left-aligned)
        const w = words[0] ?? "";
        return w + " ".repeat(Math.max(0, maxWidth - w.length));
    }
    const totalChars = words.reduce((sum, w) => sum + w.length, 0);
    const totalSpaces = maxWidth - totalChars;
    const gaps = words.length - 1;
    const evenSpace = Math.floor(totalSpaces / gaps);
    let extra = totalSpaces % gaps;
    let line = "";
    for (let i = 0; i < words.length; i++) {
        line += words[i];
        if (i < gaps) {
            line += " ".repeat(evenSpace + (extra > 0 ? 1 : 0));
            if (extra > 0)
                extra--;
        }
    }
    return line;
}

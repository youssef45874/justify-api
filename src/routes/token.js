"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRouter = void 0;
const express_1 = require("express");
const uuid_1 = require("uuid");
const tokenStore_1 = require("../utils/tokenStore");
exports.tokenRouter = (0, express_1.Router)();
exports.tokenRouter.post("/", (req, res) => {
    const { email } = req.body;
    if (!email)
        return res.status(400).json({ error: "Email requis" });
    const token = (0, uuid_1.v4)();
    (0, tokenStore_1.saveToken)(token, email);
    res.json({ token });
});
//# sourceMappingURL=token.js.map
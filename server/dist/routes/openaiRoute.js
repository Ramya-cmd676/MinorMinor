"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const openaiController_1 = require("../controllers/openaiController");
const router = express_1.default.Router();
router.post('/subTopics', openaiController_1.getSubtopics);
exports.default = router;

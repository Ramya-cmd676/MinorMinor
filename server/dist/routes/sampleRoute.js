"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sampleController_1 = require("../controllers/sampleController");
const router = express_1.default.Router();
router.get('/', sampleController_1.getSampleData);
exports.default = router;

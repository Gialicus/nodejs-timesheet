"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv = __importStar(require("dotenv"));
const check_auth_1 = require("../services/check-auth");
const Service_1 = __importDefault(require("../services/Service"));
class baseController {
    constructor() {
        this.baseURL = process.env.BASE_URL || '/api/timesheet';
        this.secretKey = process.env.SECRET_KEY || 'secretKey';
        this.service = new Service_1.default();
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const vo = yield this.service.getAll();
            return res.status(200).json(vo);
        });
        this.getAllbyEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = req.query.email;
            console.log(email);
            const vo = yield this.service.getDTObyUser(email);
            return res.status(200).json(vo);
        });
        this.add = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const listOfDay = [...req.body.timesheet];
            let validatingList = this.service.createValidItems(listOfDay);
            const objDTO = {
                user_id: req.body.user_id,
                token: req.body.token,
                email: req.body.email,
                timesheet: Object.assign({}, validatingList)
            };
            yield this.service.saveDTO(objDTO);
            return res.status(200).json(objDTO);
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
        });
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get(this.baseURL, check_auth_1.checkAuth, this.getAll);
        this.router.get(this.baseURL + '/report', check_auth_1.checkForLoad, this.getAllbyEmail);
        this.router.delete(this.baseURL + '/:id', check_auth_1.checkAuth, this.delete);
        this.router.put(this.baseURL, check_auth_1.checkAuth, this.update);
        this.router.post(this.baseURL, check_auth_1.checkAuth, this.add);
    }
}
dotenv.config();
const userController = new baseController();
exports.default = userController.router;

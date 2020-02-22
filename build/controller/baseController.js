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
const TimesheetService_1 = __importDefault(require("../services/TimesheetService"));
class baseController {
    constructor() {
        this.baseURL = process.env.BASE_URL || '/api/timesheet';
        this.secretKey = process.env.SECRET_KEY || 'secretKey';
        this.timesheetService = new TimesheetService_1.default();
        //get all User need Permission
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
        });
        //get One User by Id need Permission
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
        });
        //Register new User no Permission needed
        this.add = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const listOfDay = [...req.body];
            let validatingList = this.timesheetService.createValidItems(listOfDay);
            const objDTO = {
                user_id: '100TEST',
                user_email: 'giali@email.com',
                timesheet: [...validatingList]
            };
            yield this.timesheetService.saveAggregate(objDTO);
            return res.status(200).json(objDTO);
        });
        //Delete User by Id need Permission
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
        });
        //Update User by Email need a Special Permission only for self
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
        });
        this.router = express_1.Router();
        this.routes();
    }
    //Routes for User Controller
    routes() {
        //get all users
        this.router.get(this.baseURL, check_auth_1.checkAuth, this.getAll);
        //get user by id
        this.router.get(this.baseURL + '/:id', check_auth_1.checkAuth, this.get);
        //delete user
        this.router.delete(this.baseURL + '/:id', check_auth_1.checkAuth, this.delete);
        //update user
        this.router.put(this.baseURL, check_auth_1.checkAuth, this.update);
        //register new user
        this.router.post(this.baseURL, this.add);
    }
}
dotenv.config();
const userController = new baseController();
exports.default = userController.router;

import { Request, Response, Router } from 'express'
import * as dotenv from 'dotenv'
import { checkAuth } from '../services/check-auth'
import TimesheetService from '../services/TimesheetService';


class baseController {
    router: Router;
    baseURL = process.env.BASE_URL || '/api/timesheet';
    secretKey= process.env.SECRET_KEY || 'secretKey';
    timesheetService = new TimesheetService();

    constructor() {
        this.router = Router();
        this.routes();
    }
//get all User need Permission
    getAll = async (req: any,res: any) => {

    }
//get One User by Id need Permission
    get = async (req: Request, res: Response) => {

    }
//Register new User no Permission needed
    add = async (req: any, res: any) => {
        const listOfDay = [...req.body]
        let validatingList: any[] = this.timesheetService.createValidItems(listOfDay)
        const objDTO = {
            user_id: '100TEST',
            user_email: 'giali@email.com',
            timesheet: [...validatingList]
        }
        await this.timesheetService.saveAggregate(objDTO)
        return res.status(200).json(objDTO)
    }
//Delete User by Id need Permission
    delete = async (req: Request, res: Response) => {
    }
//Update User by Email need a Special Permission only for self
    update = async (req: Request, res: Response) => {

    }
//Routes for User Controller
    routes() {
        //get all users
        this.router.get(this.baseURL, checkAuth, this.getAll);
        //get user by id
        this.router.get(this.baseURL + '/:id', checkAuth, this.get);
        //delete user
        this.router.delete(this.baseURL + '/:id', checkAuth, this.delete);
        //update user
        this.router.put(this.baseURL, checkAuth, this.update);
        //register new user
        this.router.post(this.baseURL, this.add);
    }

}
dotenv.config();
const userController = new baseController();
export default userController.router;
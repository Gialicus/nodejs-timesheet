import { Request, Response, Router } from 'express'
import * as dotenv from 'dotenv'
import { checkAuth, checkForLoad } from '../services/check-auth'
import Service from '../services/Service';


class baseController {
    router: Router;
    baseURL = process.env.BASE_URL || '/api/timesheet';
    secretKey= process.env.SECRET_KEY || 'secretKey';
    service = new Service();

    constructor() {
        this.router = Router();
        this.routes();
    }

    getAll = async (req: any,res: any) => {
        const vo = await this.service.getAll()
        return res.status(200).json(vo)
    }

    getAllbyEmail = async (req: Request, res: Response) => {
        const email = req.query.email
        console.log(email)
        const vo = await this.service.getDTObyUser(email)
        return res.status(200).json(vo)
    }

    add = async (req: any, res: any) => {
        const listOfDay = [...req.body.timesheet]
        const id = req.body.user_id
        const email = req.body.email
        const token = req.body.token
        let validatingList = this.service.createValidItems(listOfDay)
        const objDTO = {
            user_id: id,
            token: token,
            email: email,
            timesheet: {...validatingList}
        }
        await this.service.saveDTO(objDTO)
        return res.status(200).json(objDTO)
    }

    delete = async (req: Request, res: Response) => {
    }

    update = async (req: Request, res: Response) => {

    }

    routes() {

        this.router.get(this.baseURL, checkAuth, this.getAll);

        this.router.get(this.baseURL + '/report', checkForLoad, this.getAllbyEmail);

        this.router.delete(this.baseURL + '/:id', checkAuth, this.delete);

        this.router.put(this.baseURL, checkAuth, this.update);

        this.router.post(this.baseURL, checkAuth, this.add);
    }

}
dotenv.config();
const userController = new baseController();
export default userController.router;
import { Request, Response, Router } from 'express'
import { departmentController } from '.'

const endpoint = Router()

endpoint.get('/', async (req: Request, res: Response) => {
    return await departmentController.findAll(req, res)
})

endpoint.get('/:userId/history', async (req: Request, res: Response) => {
    return await departmentController.findUsersHistory(req, res)
})

export default endpoint

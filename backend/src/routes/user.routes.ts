import { Request, Response, Router } from 'express'
import { userController } from '.'

const endpoint = Router()

endpoint.post('/register', async (req: Request, res: Response) => {
    return await userController.create(req, res)
})

endpoint.get('/:id', async (req: Request, res: Response) => {
    return await userController.findOneById(req, res)
})

endpoint.get('/', async (req: Request, res: Response) => {
    return await userController.findAll(req, res)
})

endpoint.patch('/:id', async (req: Request, res: Response) => {
    return await userController.update(req, res)
})

endpoint.delete('/:id', async (req: Request, res: Response) => {
    return await userController.delete(req, res)
})

export default endpoint

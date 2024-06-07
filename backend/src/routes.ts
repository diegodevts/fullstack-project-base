import { Router } from 'express'
import userRoutes from './routes/user.routes'
import departmentRoutes from './routes/department.routes'

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/department', departmentRoutes)

export default routes

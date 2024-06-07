import express, { NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import routes from './routes'
const host = process.env.HOST ?? 'localhost'
const port = Number(process.env.PORT) || 3000
import cors from 'cors'
import ngrok from './config/ngrok'
import { loadDepartments } from './config/load-departments'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((request: Request, response: Response, next: NextFunction) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', '*')
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')

    app.use(cors())

    next()
})

app.get('/', (request: Request, response: Response) => {
    response.json({ message: 'Welcome to API v1.0' })
})

app.use(routes)

ngrok()

app.listen(port, 'localhost', async () => {
    await loadDepartments()
    console.log(`[ ready ] http://${host}:${port}`)
})

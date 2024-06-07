import { Request, Response } from 'express'
import { CreateUserUseCase } from '../usecases/user/create-user.usecase'
import z, { ZodError } from 'zod'
import { FindUserUseCase } from '../usecases/user/find-user.usecase'
import { NotFoundError } from '../error/not-found.error'
import { FindUsersUseCase } from '../usecases/user/find-users.usecase'
import { UpdateUserUseCase } from '../usecases/user/update-user.usecase'
import { DeleteUserUseCase } from '../usecases/user/delete-user.usecase'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private findUserUseCase: FindUserUseCase,
        private findUsersUseCase: FindUsersUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private deleteUserUseCase: DeleteUserUseCase
    ) {}

    async create(req: Request, res: Response) {
        try {
            const userSchema = z.object({
                firstName: z.string(),
                lastName: z.string(),
                hireDate: z.string(),
                phone: z.string(),
                address: z.string(),
                department: z.string(),
            })

            const {
                firstName,
                lastName,
                hireDate,
                phone,
                address,
                department,
            } = userSchema.parse(req.body)

            await this.createUserUseCase.handle({
                firstName,
                lastName,
                hireDate: new Date(hireDate),
                phone,
                address,
                department,
            })

            return res.status(201).send({
                message: 'User registered with success',
                statusCode: 201,
            })
        } catch (error) {
            if (error instanceof ZodError) {
                return res
                    .status(401)
                    .send({ message: error.errors, statusCode: 401 })
            }

            if (error instanceof PrismaClientKnownRequestError) {
                return res
                    .status(401)
                    .send({ message: 'User already exists', statusCode: 401 })
            }

            return res
                .status(500)
                .send({ message: 'Internal Server error', statusCode: 500 })
        }
    }

    async findOneById(req: Request, res: Response) {
        try {
            const userSchema = z.object({
                id: z.string(),
            })

            const { id } = userSchema.parse(req.params)

            const user = await this.findUserUseCase.handle(id)

            return res.send({
                user,
                statusCode: 200,
            })
        } catch (error) {
            if (error instanceof ZodError) {
                return res
                    .status(401)
                    .send({ message: 'User id is required', statusCode: 401 })
            }

            if (error instanceof NotFoundError) {
                return res
                    .status(401)
                    .send({ message: error.message, statusCode: 404 })
            }

            return res
                .status(500)
                .send({ message: 'Internal Server error', statusCode: 500 })
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const userSchema = z.object({
                skip: z.optional(z.string()),
                take: z.optional(z.string()),
            })

            const { skip, take } = userSchema.parse(req.query)

            const { users, count } = await this.findUsersUseCase.handle(
                skip,
                take
            )

            return res.send({
                users,
                count,
                statusCode: 200,
            })
        } catch (error) {
            return res
                .status(500)
                .send({ message: 'Internal Server error', statusCode: 500 })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const userParamSchema = z.object({
                id: z.string(),
            })
            const userBodySchema = z.object({
                firstName: z.optional(z.string()),
                lastName: z.optional(z.string()),
                hireDate: z.optional(z.string()),
                phone: z.optional(z.string()),
                address: z.optional(z.string()),
                departmentName: z.optional(z.string()),
                isActive: z.optional(z.boolean()),
            })

            const { id } = userParamSchema.parse(req.params)
            const data = userBodySchema.parse(req.body)

            const user = await this.updateUserUseCase.handle({
                id: +id,
                ...data,
            })

            return res.send({
                user,
                statusCode: 200,
            })
        } catch (error) {
            if (error instanceof ZodError) {
                return res
                    .status(401)
                    .send({ message: 'User id is required', statusCode: 401 })
            }

            if (error instanceof NotFoundError) {
                return res
                    .status(401)
                    .send({ message: error.message, statusCode: 404 })
            }

            return res
                .status(500)
                .send({ message: 'Internal Server error', statusCode: 500 })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const userParamSchema = z.object({
                id: z.string(),
            })
            const { id } = userParamSchema.parse(req.params)

            await this.deleteUserUseCase.handle(+id)

            return res.status(200).send({
                message: 'User deleted with success!',
                statusCode: 200,
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                return res.status(401).send({
                    message: 'User doesnt exists or is already deleted',
                    statusCode: 401,
                })
            }

            return res
                .status(500)
                .send({ message: 'Internal Server error', statusCode: 500 })
        }
    }
}

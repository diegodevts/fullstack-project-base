import { Request, Response } from 'express'
import z from 'zod'
import { FindDepartmentsUseCase } from '../usecases/department/find-departments.usecase'
import { FindUsersHistoryUseCase } from '../usecases/department/get-users-history.usecase'

export class DepartmentController {
    constructor(
        private findDepartmentsUseCase: FindDepartmentsUseCase,
        private findUsersHistoryUseCase: FindUsersHistoryUseCase
    ) {}

    async findAll(req: Request, res: Response) {
        try {
            const departmentSchema = z.object({
                skip: z.optional(z.string()),
                take: z.optional(z.string()),
            })

            const { skip, take } = departmentSchema.parse(req.query)

            const departments = await this.findDepartmentsUseCase.handle(
                skip,
                take
            )

            return res.send({
                departments,
                statusCode: 200,
            })
        } catch (error) {
            return res
                .status(500)
                .send({ message: 'Internal Server error', statusCode: 500 })
        }
    }

    async findUsersHistory(req: Request, res: Response) {
        try {
            const historySchema = z.object({
                skip: z.optional(z.string()),
                take: z.optional(z.string()),
            })
            const userIdSchema = z.object({
                userId: z.string(),
            })

            const { skip, take } = historySchema.parse(req.query)
            const { userId } = userIdSchema.parse(req.params)

            const { departments, count } =
                await this.findUsersHistoryUseCase.handle({
                    userId: +userId,
                    skip,
                    take,
                })

            return res.send({
                history: departments,
                count,
                statusCode: 200,
            })
        } catch (error) {
            return res
                .status(500)
                .send({ message: 'Internal Server error', statusCode: 500 })
        }
    }
}

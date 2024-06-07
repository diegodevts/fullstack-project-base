import { Department } from '@prisma/client'
import prisma from '../database/prisma'
import { IDepartmentRepository } from '../interfaces/department-repository.interface'

export class DepartmentRepository implements IDepartmentRepository {
    async findAll(skip?: string, take?: string): Promise<Department[]> {
        const departments = await prisma.department.findMany({
            skip: skip ? +skip : 0,
            take: take ? +take : 10,
        })

        return departments
    }

    async findUsersHistory({
        userId,
        skip,
        take,
    }: {
        userId: number
        skip?: string
        take?: string
    }): Promise<
        {
            departments: {
                department: {
                    id: string
                    name: string
                }
                date: Date
            }[]
        } & { count: number }
    > {
        const [departments, count] = await prisma.$transaction([
            prisma.departmentHistory.findMany({
                where: { userId },
                skip: skip ? +skip : 0,
                take: take ? +take : 10,
                select: {
                    department: true,
                    date: true,
                },
            }),
            prisma.departmentHistory.count({ where: { userId } }),
        ])

        return { departments, count }
    }
}

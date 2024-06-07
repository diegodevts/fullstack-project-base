import { Department, User } from '@prisma/client'
import { IUserRepository } from '../interfaces/user-repository.interface'
import prisma from '../database/prisma'
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CreateUserDto } from '../../../shared/dtos/create-user.dto'
// eslint-disable-next-line @nx/enforce-module-boundaries
import { UpdateUserDto } from '../../../shared/dtos/update-user.dto'
import { NotFoundError } from '../error/not-found.error'
export class UserRepository implements IUserRepository {
    async create(data: CreateUserDto): Promise<void> {
        await prisma.$transaction(async (prisma) => {
            let department: Department

            const hasDepartment = await prisma.department.findFirst({
                where: { name: data.department.toUpperCase() },
            })

            if (!hasDepartment) {
                department = await prisma.department.create({
                    data: { name: data.department.toUpperCase() },
                })
            } else {
                department = hasDepartment
            }

            const user = await prisma.user.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    isActive: true,
                    hireDate: data.hireDate,
                    address: data.address,
                    phone: data.phone,
                    departmentId: department.id,
                },
            })

            await prisma.departmentHistory.create({
                data: {
                    userId: user.id,
                    departmentId: department.id,
                    date: data.hireDate,
                },
            })
        })
    }

    async findOneBy(field: string, data: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                [field]: data,
            },
            include: { department: true },
        })

        return user
    }

    async findAll(
        skip: string | undefined,
        take: string | undefined
    ): Promise<{ users: User[]; count: number }> {
        const [users, count] = await prisma.$transaction([
            prisma.user.findMany({
                skip: skip ? +skip : 0,
                take: take ? +take : 10,
                include: { department: true },
            }),
            prisma.user.count(),
        ])

        return { users, count }
    }

    async update(data: Partial<UpdateUserDto>): Promise<User> {
        const department = await prisma.department.findFirst({
            where: { name: data.departmentName },
        })

        const hasUser = await prisma.user.findUnique({ where: { id: data.id } })

        if (!hasUser) {
            throw new NotFoundError('User')
        }

        if (!department) {
            return hasUser
        }

        const updatedUser = await prisma.user.update({
            data: {
                address: data.address,
                phone: data.phone,
                firstName: data.firstName,
                hireDate: data.hireDate,
                isActive: data.isActive,
                lastName: data.lastName,
                department: {
                    connect: { id: department?.id },
                },
            },
            where: { id: data.id },
            include: { department: true },
        })

        if (hasUser?.departmentId != department?.id) {
            await prisma.departmentHistory.create({
                data: {
                    userId: hasUser.id,
                    departmentId: department ? department.id : '',
                    date: new Date(),
                },
            })
        }

        return updatedUser
    }

    async delete(id: number): Promise<void> {
        await prisma.$transaction([
            prisma.departmentHistory.deleteMany({ where: { userId: id } }),
            prisma.user.delete({ where: { id } }),
        ])
    }
}

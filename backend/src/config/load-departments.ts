import prisma from '../database/prisma'

export const loadDepartments = async () => {
    const departments = [
        {
            name: 'TI',
        },
        {
            name: 'ADM',
        },
        {
            name: 'BUSINESS',
        },
        {
            name: 'ENGINERING',
        },
        {
            name: 'LAW',
        },
        {
            name: 'NURSE',
        },
        {
            name: 'HR',
        },
        {
            name: 'RECRUITER',
        },
        {
            name: 'CEO',
        },
        {
            name: 'CTO',
        },
    ]

    const departmentsExist = await prisma.department.findMany()

    if (departmentsExist.length === departments.length) {
        return
    }

    await prisma.department.createMany({
        data: departments,
    })
}

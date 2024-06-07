import { Department } from '@prisma/client'

export interface IDepartmentRepository {
    findAll(skip?: string, take?: string): Promise<Department[]>
}

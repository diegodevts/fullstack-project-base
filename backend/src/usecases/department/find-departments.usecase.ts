import { Department } from '@prisma/client'
import { UseCase } from '../../interfaces/usecase.interface'
import { DepartmentRepository } from '../../repositories/department.repository'

export class FindDepartmentsUseCase implements UseCase<Department[]> {
    constructor(private departmentRepository: DepartmentRepository) {}

    async handle(skip?: string, take?: string) {
        const departments = await this.departmentRepository.findAll(skip, take)

        return departments
    }
}

import { UseCase } from '../../interfaces/usecase.interface'
import { DepartmentRepository } from '../../repositories/department.repository'

export class FindUsersHistoryUseCase
    implements
        UseCase<
            {
                departments: {
                    department: {
                        id: string
                        name: string
                    }
                }[]
            } & { count: number }
        >
{
    constructor(private departmentRepository: DepartmentRepository) {}

    async handle({
        skip,
        take,
        userId,
    }: {
        skip?: string
        take?: string
        userId: number
    }) {
        const departments = await this.departmentRepository.findUsersHistory({
            skip,
            take,
            userId,
        })

        return departments
    }
}

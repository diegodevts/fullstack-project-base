import { User } from '@prisma/client'
import { UseCase } from '../../interfaces/usecase.interface'
import { UserRepository } from '../../repositories/user.repository'

export class FindUsersUseCase
    implements UseCase<{ users: User[]; count: number }>
{
    constructor(private userRepository: UserRepository) {}

    async handle(skip: string | undefined, take: string | undefined) {
        return await this.userRepository.findAll(skip, take)
    }
}

import { User } from '@prisma/client'
import { NotFoundError } from '../../../../backend/src/error/not-found.error'
import { UseCase } from '../../../../backend/src/interfaces/usecase.interface'
import { UserRepository } from '../../../../backend/src/repositories/user.repository'

export class FindUserUseCase implements UseCase<User> {
    constructor(private userRepository: UserRepository) {}

    async handle(id: string) {
        const user = await this.userRepository.findOneBy('id', id)

        if (!user) {
            throw new NotFoundError('User')
        }

        return user
    }
}

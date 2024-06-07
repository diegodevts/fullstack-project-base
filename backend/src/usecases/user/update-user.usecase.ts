// eslint-disable-next-line @nx/enforce-module-boundaries
import { UseCase } from '../../interfaces/usecase.interface'
import { UserRepository } from '../../repositories/user.repository'
// eslint-disable-next-line @nx/enforce-module-boundaries
import { UpdateUserDto } from './../../../../shared/dtos/update-user.dto'
import { User } from '@prisma/client'

export class UpdateUserUseCase implements UseCase<User> {
    constructor(private userRepository: UserRepository) {}

    async handle(data: Partial<UpdateUserDto>) {
        return await this.userRepository.update(data)
    }
}

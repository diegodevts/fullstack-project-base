// eslint-disable-next-line @nx/enforce-module-boundaries
import { CreateUserDto } from '../../../../shared/dtos/create-user.dto'
import { UseCase } from '../../interfaces/usecase.interface'
import { UserRepository } from '../../repositories/user.repository'

export class CreateUserUseCase implements UseCase<CreateUserDto> {
    constructor(private userRepository: UserRepository) {}

    async handle(data: CreateUserDto) {
        await this.userRepository.create(data)
    }
}

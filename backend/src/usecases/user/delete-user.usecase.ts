import { UseCase } from '../../interfaces/usecase.interface'
import { UserRepository } from '../../repositories/user.repository'

export class DeleteUserUseCase implements UseCase<number> {
    constructor(private userRepository: UserRepository) {}

    async handle(id: number) {
        await this.userRepository.delete(id)
    }
}

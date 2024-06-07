import { User } from '@prisma/client'
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CreateUserDto } from '../../../shared/dtos/create-user.dto'
// eslint-disable-next-line @nx/enforce-module-boundaries
import { UpdateUserDto } from '../../../shared/dtos/update-user.dto'

export interface IUserRepository {
    create(user: CreateUserDto): Promise<void>
    findAll(
        skip: string | undefined,
        take: string | undefined
    ): Promise<{ users: User[]; count: number }>
    findOneBy(field: string, data: string): Promise<User | null>
    update(data: Partial<UpdateUserDto>): Promise<User>
    delete(id: number): Promise<void>
}

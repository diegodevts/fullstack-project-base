import { DepartmentController } from '../controllers/department.controller'
import { UserController } from '../controllers/user.controller'
import { DepartmentRepository } from '../repositories/department.repository'
import { UserRepository } from '../repositories/user.repository'
import { FindDepartmentsUseCase } from '../usecases/department/find-departments.usecase'
import { FindUsersHistoryUseCase } from '../usecases/department/get-users-history.usecase'
import { CreateUserUseCase } from '../usecases/user/create-user.usecase'
import { DeleteUserUseCase } from '../usecases/user/delete-user.usecase'
import { FindUserUseCase } from '../usecases/user/find-user.usecase'
import { FindUsersUseCase } from '../usecases/user/find-users.usecase'
import { UpdateUserUseCase } from '../usecases/user/update-user.usecase'

const userRepository = new UserRepository()
const departmentRepository = new DepartmentRepository()

const createUserUseCase = new CreateUserUseCase(userRepository)
const findUserUseCase = new FindUserUseCase(userRepository)
const findUsersUseCase = new FindUsersUseCase(userRepository)
const updateUserUseCase = new UpdateUserUseCase(userRepository)
const deleteUserUseCase = new DeleteUserUseCase(userRepository)
const findDepartmentsUseCase = new FindDepartmentsUseCase(departmentRepository)
const findUsersHistoryUseCase = new FindUsersHistoryUseCase(
    departmentRepository
)

const userController = new UserController(
    createUserUseCase,
    findUserUseCase,
    findUsersUseCase,
    updateUserUseCase,
    deleteUserUseCase
)
const departmentController = new DepartmentController(
    findDepartmentsUseCase,
    findUsersHistoryUseCase
)

export { userController, departmentController }

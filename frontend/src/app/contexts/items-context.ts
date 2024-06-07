import { createContext } from 'react'
import { UserAndDepartment } from '../dtos/users-and-department'
import { Department } from '@prisma/client'

type MyContextProps = {
    employee: UserAndDepartment | undefined
    setEmployee: React.Dispatch<
        React.SetStateAction<UserAndDepartment | undefined>
    >
    employees: UserAndDepartment[]
    currentPage: number
    totalPages: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    setEmployees: React.Dispatch<React.SetStateAction<UserAndDepartment[]>>
    search: (currentPage?: number, itemsPerPage?: number) => Promise<void>
    departments: Department[]
    history: { department: { id: string; name: string }; date: Date }[]
    setHistory: React.Dispatch<
        React.SetStateAction<
            { department: { id: string; name: string }; date: Date }[]
        >
    >
    itemsPerPage: number
    dimensions: number
}

const MyContext = createContext({} as MyContextProps)

export default MyContext

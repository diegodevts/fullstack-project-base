import { ReactNode, useEffect, useMemo, useState } from 'react'
import MyContext from './items-context'
import { UserAndDepartment } from '../dtos/users-and-department'
import { findDepartments, findEmployees } from '../http/http'
import { Department } from '@prisma/client'

type MyProviderProps = {
    children: ReactNode
}

export function MyProvider({ children }: MyProviderProps) {
    const [employee, setEmployee] = useState<UserAndDepartment>()
    const [employees, setEmployees] = useState<UserAndDepartment[]>([])
    const [dimensions, setDimensions] = useState(window.innerWidth)
    const [departments, setDepartments] = useState<Department[]>([])
    const [history, setHistory] = useState<
        { department: { id: string; name: string }; date: Date }[]
    >([])
    const [totalItems, setTotalItems] = useState(0)

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = dimensions > 520 ? 7 : 4
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    useEffect(() => {
        function handleResize() {
            setDimensions(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [dimensions])

    const search = async () => {
        const { data } = await findEmployees({
            currentPage,
            itemsPerPage,
        })

        setEmployees(data?.users ?? [])
        setTotalItems(data?.count ?? 0)
    }

    useEffect(() => {
        search()
    }, [currentPage, itemsPerPage])

    useMemo(() => {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(async () => {
            const departments = await findDepartments()
            setDepartments(departments.data ?? [])
        })()
    }, [])

    return (
        <MyContext.Provider
            value={{
                employee,
                setEmployee,
                employees,
                setEmployees,
                currentPage,
                totalPages,
                setCurrentPage,
                search,
                departments,
                history,
                setHistory,
                itemsPerPage,
                dimensions,
            }}
        >
            {children}
        </MyContext.Provider>
    )
}

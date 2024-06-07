export type UserAndDepartment = {
    id: number
    firstName: string
    lastName: string
    hireDate: string
    phone: string
    isActive: boolean
    address: string
    departmentId: string
    department: {
        id: string
        name: string
    }
}

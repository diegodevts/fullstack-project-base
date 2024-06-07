import { Global, MainContainer } from '../../styles'
import Pagination from '../pagination/pagination'
import { EmployeesTable } from './employees-table'
import { Header } from './header'

export const EmployeeList = () => {
    return (
        <MainContainer>
            <Header />
            <EmployeesTable />
            <Pagination />
            <Global />
        </MainContainer>
    )
}

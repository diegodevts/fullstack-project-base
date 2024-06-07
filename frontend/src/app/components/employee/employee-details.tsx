/* eslint-disable @typescript-eslint/no-extra-semi */
import { useContext, useEffect, useMemo, useState } from 'react'
import { FaUser } from 'react-icons/fa6'
import styled from 'styled-components'
import { ButtonPrimary } from '../../styles'
import { DialogModal } from '../dialog-modal/dialog-modal'
import { UserAndDepartment } from '../../dtos/users-and-department'
import { formatDate, periodCalc } from '../../utils/format-date'
import { findDepartmentsHistory, updateEmployee } from '../../http/http'
import MyContext from '../../contexts/items-context'
import { Bounce, toast } from 'react-toastify'
import HistoryPagination from '../pagination/history-pagination'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`

const Table = styled.table`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border-spacing: 0;
`
const THead = styled.thead`
    width: 100%;
    height: 8%;
    background-color: #eaeaea;
`
const TBody = styled.tbody`
    width: 100%;
    height: 5%;
`

const Th = styled.th<{ width?: string }>`
    font-size: small;
    color: #9f9e9e;
    width: ${(props) => props.width};
    display: flex;
    align-items: center;

    @media (max-width: 330px) {
        font-size: x-small;
    }
`
const Td = styled.td<{
    justifyContent?: string
    marginLeft?: string
}>`
    font-size: x-small;
    display: flex;
    align-items: center;
    justify-content: ${(props) => props.justifyContent};
    margin-left: ${(props) => props.marginLeft};

    @media (max-width: 330px) {
        font-size: xx-small;
    }

    @media (max-width: 271px) {
        font-size: 8px;
    }

    @media (max-width: 245px) {
        font-size: 7px;
    }
`

const Tr = styled.tr<{ gap?: string | number; marginLeft?: string }>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    margin-left: ${(props) => props.marginLeft};
    gap: ${(props) => props.gap};
`

const ContainerInfo = styled.div<{
    marginLeft?: string
    flexDirection?: string
    justifyContent?: string
    height?: string
    width?: string
    alignItems?: string
    backgroundColor?: string
    color?: string
    padding?: string
    marginBottom?: string
    gridArea?: string
    lowWidth?: string
}>`
    display: flex;
    flex-direction: ${(props) => props.flexDirection ?? 'column'};
    margin-left: ${(props) => props.marginLeft ?? '15px'};
    justify-content: ${(props) => props.justifyContent};
    height: ${(props) => props.height};
    width: ${(props) => props.width};
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};
    padding: ${(props) => props.padding};
    margin-bottom: ${(props) => props.marginBottom};
    align-items: ${(props) => props.alignItems};
    grid-area: ${(props) => props.gridArea};
`

const ContainerModal = styled.div`
    display: grid;
    grid-template-columns: 37% 63%;
    grid-template-rows: 8% 63% 23%;
    gap: 2%;
    column-gap: 8px;
    grid-template-areas:
        'header header'
        'div1 div3'
        'div2 div3';
    background-color: #f8f6f6;
    width: 550px;
    height: 500px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

    @media (max-width: 552px) {
        width: 470px;
        column-gap: 5%;
        gap: 1%;
        grid-template-rows: 10% 65% 22%;
        column-gap: 9px;
    }

    @media (max-width: 431px) {
        height: 450;
    }

    @media (max-width: 330px) {
        width: 300px;
        /* height: 450px; */
        column-gap: 3%;
    }
`

const Label = styled.div<{ isActive?: boolean }>`
    width: 156px;
    height: 2%;
    position: absolute;
    bottom: 72%;
    background-color: red;
    display: ${(props) => (props.isActive ? 'none' : 'flex')};
    align-items: center;
    justify-content: center;
    visibility: ${(props) => (props.isActive ? 'hidden' : 'visible')};

    @media (max-width: 552px) {
        width: 131px;
    }

    @media (max-width: 465px) {
        width: 28%;
    }

    @media (max-width: 431px) {
        width: 101px;
    }

    @media (max-width: 357px) {
        width: 28%;
    }

    @media (max-width: 326px) {
        width: 28%;
    }

    @media (max-width: 271px) {
        width: 75.49px;
    }
`

const Span = styled.span`
    cursor: pointer;
    position: relative;
    top: 6%;
    left: 33%;
    font-size: 20px;
    color: #aaa;

    @media (max-width: 552px) {
        left: 28%;
    }
    @media (max-width: 431px) {
        left: 22%;
    }

    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
`

const Text = styled.text<{
    fontSize?: string
    color?: string
    marginBottom?: string
    fontWeight?: string
    marginTop?: string
}>`
    font-size: ${(props) => props.fontSize};
    color: ${(props) => props.color};
    margin-bottom: ${(props) => props.marginBottom};
    margin-top: ${(props) => props.marginTop};
    font-weight: ${(props) => props.fontWeight};
    text-align: center;

    @media (max-width: 366px) {
        font-size: ${(props) =>
            props.fontSize === '20px' ? '13px' : props.fontSize};
    }
`

const Select = styled.select`
    width: 95%;
    background: white;
    color: gray;
    border-radius: 5px;
    padding-left: 5px;
    font-size: 12px;

    option {
        color: black;
        background: white;
        display: flex;
        white-space: pre;
        min-height: 20px;
        padding: 0px 2px 1px;
    }
`

const ModalHeader = styled.div`
    background-color: #eaeaea;
    grid-area: 'header';
    width: 269%;
    height: 85%;
    padding: 1% 0 1% 1%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
`

export const EmployeeDetails = ({
    show,
}: {
    show: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const {
        employee,
        setEmployee,
        setHistory,
        departments,
        history,
        dimensions,
    } = useContext(MyContext)
    const [isUpdating, setUpdating] = useState(false)
    const [modal, setModal] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)

    const itemsPerPage = 6
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    useMemo(() => {
        if (totalPages !== 0 && totalPages < currentPage) {
            setCurrentPage(totalPages)
        }
    }, [dimensions])

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(async () => {
            const employeeHistory = await findDepartmentsHistory({
                itemsPerPage,
                currentPage,
                userId: employee?.id,
            })

            setHistory(employeeHistory.data ?? [])

            setTotalItems(employeeHistory.count)
        })()
    }, [currentPage, itemsPerPage])

    const handleDepartment = (data: string) => {
        const [id, name] = data.split(',')
        if (id !== employee?.departmentId) {
            setUpdating(true)
            setEmployee({
                ...employee,
                department: { id, name },
            } as UserAndDepartment)

            return
        }

        setUpdating(false)
    }

    const handleUpdateDepartment = async () => {
        if (employee) {
            const updatedEmployee = await updateEmployee({
                ...employee,
                departmentName: employee.department.name,
            })

            toast(`User's department updated`, {
                position: 'top-right',
                type: updatedEmployee.type,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
            })

            const histories = await findDepartmentsHistory({
                currentPage,
                itemsPerPage,
                userId: employee.id,
            })

            setHistory(histories.data ?? [])
            setEmployee(updatedEmployee.data)

            setUpdating(false)
        }
    }

    const handleActivate = () => {
        setModal(true)
    }

    return (
        <div>
            <Container>
                <ContainerModal>
                    <ModalHeader>
                        <Text fontSize="16px" color="#9f9e9e" fontWeight="bold">
                            Employee Details
                        </Text>
                        <Span
                            onClick={() => {
                                show(false)
                                setUpdating(false)
                            }}
                        >
                            &times;
                        </Span>
                    </ModalHeader>

                    <ContainerInfo
                        gridArea="div1"
                        backgroundColor="white"
                        padding="10px"
                        height="93.4%"
                        marginLeft="4%"
                        alignItems="center"
                        width="85%"
                        style={{
                            borderRadius: '5px',
                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <ContainerInfo
                            backgroundColor="#87CEEB"
                            marginLeft="0"
                            width="90%"
                            height="40%"
                            alignItems="center"
                            justifyContent="center"
                            style={{
                                borderRadius: '5px',
                            }}
                        >
                            <FaUser
                                color="#00008B"
                                size={100}
                                style={{
                                    display: 'flex',
                                    padding: '8px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'none',
                                    borderRadius: '5px',
                                    width: '70%',
                                    height: '70%',
                                }}
                            />
                            <Label isActive={employee?.isActive}>
                                <Text color="#fff" fontSize="11px">
                                    Inactive
                                </Text>
                            </Label>
                        </ContainerInfo>

                        <Text fontSize="20px" color="#696969" fontWeight="bold">
                            {employee?.firstName}
                        </Text>
                        <Text fontSize="xx-small" color="#808080">
                            Employee id: {employee?.id}
                        </Text>
                        <Text fontSize="xx-small" color="#808080">
                            Department: {employee?.department.name}
                        </Text>
                        <Text fontSize="xx-small" color="#808080">
                            Telephone: {employee?.phone}
                        </Text>
                        <Text fontSize="xx-small" color="#808080">
                            Address: {employee?.address}
                        </Text>

                        <Text
                            fontSize="10px"
                            color="#696969"
                            marginTop="18px"
                            fontWeight="bold"
                        >
                            Update Department
                        </Text>
                        <Select
                            onChange={(e) => handleDepartment(e.target.value)}
                        >
                            {departments
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((item, i) => (
                                    <option
                                        value={`${item.id},${item.name}`}
                                        key={item.id}
                                        selected={
                                            employee?.department.id === item.id
                                        }
                                    >
                                        {item.name}
                                    </option>
                                ))}
                        </Select>
                        <ButtonPrimary
                            $primary
                            color={isUpdating ? 'green' : '#666666'}
                            onClick={handleUpdateDepartment}
                            height="20px"
                            fontSize="12px"
                            width="95%"
                            disabled={isUpdating ? false : true}
                            margin="10px 0 0 0"
                        >
                            Update
                        </ButtonPrimary>
                    </ContainerInfo>

                    <ContainerInfo
                        gridArea="div2"
                        backgroundColor="white"
                        justifyContent="center"
                        height="80%"
                        padding="10px"
                        marginLeft="4%"
                        width="85%"
                        style={{
                            borderRadius: '5px',
                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                        }}
                        alignItems="center"
                    >
                        <Text fontSize="20px" color="#696969" fontWeight="bold">
                            Hire Date
                        </Text>
                        <Text fontSize="11px" color="#808080">
                            {employee?.hireDate}
                        </Text>
                        <ButtonPrimary
                            $primary
                            color={employee?.isActive ? 'red' : 'green'}
                            height="20px"
                            width="60px"
                            margin="10px 0 0 10px "
                            fontSize="10px"
                            onClick={handleActivate}
                        >
                            {employee?.isActive ? 'Deactivate' : 'Activate'}
                        </ButtonPrimary>
                    </ContainerInfo>

                    <ContainerInfo
                        height="99.4%"
                        width="95%"
                        gridArea="div3"
                        marginLeft="0"
                    >
                        <ContainerInfo marginLeft="0" width="93%">
                            <Text
                                fontSize="20px"
                                color="#696969"
                                fontWeight="bold"
                            >
                                Department History
                            </Text>
                        </ContainerInfo>

                        <ContainerInfo
                            backgroundColor="white"
                            height="28rem"
                            marginLeft="0"
                            width="100%"
                            style={{
                                borderRadius: '5px',
                                boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                            }}
                            alignItems="center"
                        >
                            <Table>
                                <THead>
                                    <Tr marginLeft="9%" gap="15%">
                                        <Th width="40%">DATE</Th>
                                        <Th width="60%">DEPARTMENT</Th>
                                    </Tr>
                                </THead>
                                <TBody>
                                    {history.length > 0 &&
                                        history.map((item, i) => (
                                            <Tr key={i} gap="30%">
                                                <Td
                                                    style={{
                                                        gridArea: 'hireDate',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                    }}
                                                >
                                                    <label>
                                                        {formatDate(
                                                            new Date(item.date)
                                                        )}
                                                    </label>
                                                    <label>
                                                        {periodCalc(
                                                            new Date(item.date)
                                                        )}
                                                    </label>
                                                </Td>
                                                <Td justifyContent="center">
                                                    {item.department.name}
                                                </Td>
                                            </Tr>
                                        ))}
                                </TBody>
                            </Table>
                            <HistoryPagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                            />
                        </ContainerInfo>
                    </ContainerInfo>
                </ContainerModal>
            </Container>

            <DialogModal
                isOpen={modal}
                show={setModal}
                mode="update"
                text={`Do you want to ${
                    employee?.isActive ? 'deactivate' : 'activate'
                } the employee ${employee?.firstName} ${employee?.lastName}`}
            />
        </div>
    )
}

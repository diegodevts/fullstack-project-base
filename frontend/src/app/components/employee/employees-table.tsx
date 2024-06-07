import styled from 'styled-components'
import { FaX, FaUser } from 'react-icons/fa6'
import { Button, ButtonPrimary } from '../../styles'
import { EmployeeDetails } from './employee-details'
import { useContext, useState } from 'react'
import { DialogModal } from '../dialog-modal/dialog-modal'
import { formatDate, periodCalc } from '../../utils/format-date'
import MyContext from '../../contexts/items-context'
import { UserAndDepartment } from '../../dtos/users-and-department'

const Table = styled.table`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border-spacing: 0;

    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    @media (max-width: 520px) {
        background-color: #f8f6f6;
        box-shadow: none;
        border: none;
    }
`
const THead = styled.thead`
    @media (max-width: 520px) {
        display: none;
    }

    width: 100%;
    height: 5%;
    background-color: #eaeaea;
`
const TBody = styled.tbody`
    width: 100%;
    height: 5%;

    @media (max-width: 520px) {
        background-color: #f8f6f6;
        box-shadow: none;
        border: none;
    }
`

const Th = styled.th<{ width?: string }>`
    font-size: small;
    color: #9f9e9e;
    width: ${(props) => props.width ?? '17%'};
`
const Td = styled.td<{
    justifyContent?: string
    marginLeft?: string
    fontSize?: string
    fontWeight?: string
    $active?: boolean | undefined
    width?: string
}>`
    display: ${(props) => (props.$active !== undefined ? 'none' : 'flex')};
    font-size: ${(props) => props.fontSize};
    align-items: center;
    justify-content: center;
    margin-left: ${(props) => props.marginLeft};
    width: ${(props) => props.width ?? '17%'};

    @media (max-width: 520px) {
        display: ${(props) => (props.$active !== undefined ? 'flex' : 'data')};
        align-items: center;
        justify-content: center;
        font-size: ${(props) => props.fontSize};
        font-weight: ${(props) => props.fontWeight};
        width: 90%;
        margin: 0;
        height: 50%;
    }
`

const Tr = styled.tr<{ gap?: string }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    gap: ${(props) => props.gap};

    @media (max-width: 520px) {
        display: grid;
        grid-template-rows: 20%;
        grid-template-columns: 60% 40%;
        grid-template-areas:
            'name buttons'
            'name buttons'
            'titleDepartment titleHireDate'
            'department hireDate';
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        background-color: #fff;
        border-radius: 5px;
        margin-top: 10px;
    }
`

const Container = styled.div<{
    width?: string
    height?: string
    borderRadius?: string
    gap?: number
    flexDirection?: string
}>`
    width: ${(props) => props.width ?? '100%'};
    height: ${(props) => props.height ?? '100%'};
    background-color: #fff;
    display: flex;
    box-sizing: border-box;
    border-radius: ${(props) => props.borderRadius ?? '5px'};
    gap: ${(props) => props.gap ?? 0};
    flex-direction: ${(props) => props.flexDirection};

    @media (max-width: 956px) {
        width: 680px;
    }
    @media (max-width: 680px) {
        width: 516px;
        height: 100%;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
    }

    @media (max-width: 520px) {
        width: 100%;
    }
`

export const EmployeesTable = () => {
    const [modal, setModal] = useState(false)
    const { employee, setEmployee, employees } = useContext(MyContext)

    const [modalDialog, setModalDialog] = useState(false)

    const handleDetails = async (item: UserAndDepartment) => {
        setEmployee(item)

        setModal(true)
    }

    return (
        employees.length > 0 && (
            <Container>
                <Table>
                    <THead>
                        <Tr gap="0">
                            <Th>NAME</Th>
                            <Th>DEPARTMENT</Th>
                            <Th>HIRE DATE</Th>
                            <Th>OPTIONS</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {employees.map((item, i) => (
                            <Tr key={i} gap="0">
                                <Td
                                    justifyContent="space-evenly"
                                    fontWeight="bold"
                                    fontSize="x-small"
                                    marginLeft="2%"
                                    style={{
                                        gap: '2%',
                                        gridArea: 'name',
                                    }}
                                >
                                    <FaUser
                                        color="#00008B"
                                        size={20}
                                        style={{
                                            display: 'flex',
                                            padding: '5px',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#87CEEB',
                                            borderRadius: '50px',
                                        }}
                                    />
                                    <label
                                        style={{ width: '60%' }}
                                    >{`${item.firstName} ${item.lastName}`}</label>
                                </Td>
                                <Td
                                    $active
                                    fontSize="small"
                                    fontWeight="bold"
                                    style={{ gridArea: 'titleDepartment' }}
                                >
                                    Department:
                                </Td>
                                <Td
                                    fontSize="x-small"
                                    style={{
                                        gridArea: 'department',
                                        marginRight: '3%',
                                    }}
                                >
                                    {item.department.name}
                                </Td>
                                <Td
                                    $active
                                    fontSize="small"
                                    fontWeight="bold"
                                    style={{ gridArea: 'titleHireDate' }}
                                >
                                    Hire Date:
                                </Td>
                                <Td
                                    fontSize="x-small"
                                    style={{
                                        gridArea: 'hireDate',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <label>
                                        {formatDate(new Date(item?.hireDate))}
                                    </label>
                                    <label>
                                        {periodCalc(new Date(item?.hireDate))}
                                    </label>
                                </Td>

                                <Td style={{ gridArea: 'buttons' }}>
                                    <ButtonPrimary
                                        fontSize="x-small"
                                        $primary
                                        color="green"
                                        onClick={() => handleDetails(item)}
                                    >
                                        View Details
                                    </ButtonPrimary>
                                    <Button marginRight="8px">
                                        <FaX
                                            color="red"
                                            onClick={() => {
                                                setModalDialog(true)

                                                setEmployee(item)
                                            }}
                                        />
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </TBody>
                </Table>
                {modal && <EmployeeDetails show={setModal} />}

                <DialogModal
                    mode="delete"
                    isOpen={modalDialog}
                    show={setModalDialog}
                    text={`Do you want to delete the employee ${employee?.firstName} ${employee?.lastName}`}
                />
            </Container>
        )
    )
}

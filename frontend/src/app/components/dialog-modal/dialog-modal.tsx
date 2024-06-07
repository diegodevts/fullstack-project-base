import React, { useContext } from 'react'
import styled from 'styled-components'
import { ButtonPrimary } from '../../styles'
import { deleteEmployee, updateEmployee } from '../../http/http'
import MyContext from '../../contexts/items-context'
import { Bounce, toast } from 'react-toastify'

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

const ContainerInfo = styled.div<{
    marginLeft?: string
    flexDirection?: string
    justifyContent?: string
    height?: string
    width?: string
    backgroundColor?: string
    color?: string
    alignItems?: string
}>`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    display: flex;
    flex-direction: row;
    margin-left: ${(props) => props.marginLeft};
    justify-content: ${(props) => props.justifyContent};
    align-items: ${(props) => props.alignItems};
    height: ${(props) => props.height};
    width: ${(props) => props.width};
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};
`

const ContainerModal = styled.div`
    display: flex;
    background-color: white;
    flex-direction: column;
    width: 27%;
    height: 14%;
    z-index: 2;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
        width: 212px;
    }
`

const Text = styled.text<{
    fontSize?: string
    color?: string
    marginTop?: string
    fontWeight?: string
}>`
    font-size: ${(props) => props.fontSize};
    color: ${(props) => props.color};
    margin-top: ${(props) => props.marginTop};
    font-weight: ${(props) => props.fontWeight};
    margin-left: 2%;

    @media (max-width: 711px) {
        font-size: x-small;
    }

    @media (max-width: 426px) {
        font-size: xx-small;
    }
`

export const DialogModal = ({
    isOpen,
    show,
    mode,
    text,
}: {
    isOpen: boolean
    show: React.Dispatch<React.SetStateAction<boolean>>
    text: string
    mode: 'update' | 'delete' | 'register'
}) => {
    const { employee, setEmployee, search, currentPage, itemsPerPage } =
        useContext(MyContext)

    const handleUpdate = async () => {
        show(false)
        let handledEmployee

        if (mode === 'update') {
            handledEmployee = await updateEmployee({
                ...employee,
                isActive: !employee?.isActive,
                departmentName: employee?.department.name,
            })

            setEmployee(handledEmployee.data)
        }

        if (mode === 'delete') {
            handledEmployee = await deleteEmployee(employee?.id)
        }

        await search(currentPage, itemsPerPage)

        toast(handledEmployee?.message, {
            position: 'top-right',
            type: handledEmployee?.type,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
        })
    }

    return (
        <div>
            {isOpen && (
                <Container>
                    <ContainerModal>
                        <ContainerInfo
                            backgroundColor="#eaeaea"
                            width="100%"
                            height="50%"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Text
                                fontSize="14px"
                                color="#696969"
                                fontWeight="bold"
                            >
                                {text}
                            </Text>
                        </ContainerInfo>

                        <ContainerInfo justifyContent="space-between">
                            <ButtonPrimary
                                $primary
                                color="green"
                                onClick={() => handleUpdate()}
                                height="30px"
                                fontSize="12px"
                                width="50%"
                            >
                                Yes
                            </ButtonPrimary>

                            <ButtonPrimary
                                $primary
                                color="red"
                                onClick={() => {
                                    show(false)
                                }}
                                height="30px"
                                fontSize="12px"
                                width="50%"
                            >
                                No
                            </ButtonPrimary>
                        </ContainerInfo>
                    </ContainerModal>
                </Container>
            )}
        </div>
    )
}

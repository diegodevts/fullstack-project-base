/* eslint-disable @nx/enforce-module-boundaries */
import styled from 'styled-components'
import { useContext, useState } from 'react'
import { DialogModal } from '../dialog-modal/dialog-modal'
import { ButtonPrimary } from '../../styles'
import { FieldError, FieldErrorsImpl, Merge, useForm } from 'react-hook-form'
import { CreateUserDto } from '../../../../../shared/dtos/create-user.dto'
import { registerEmployee } from '../../http/http'
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

const ContainerModal = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 321px;
    background-color: #eaeaea;
    height: 60%;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`

const Input = styled.input<{
    $invalid:
        | Merge<
              FieldError,
              FieldErrorsImpl<{
                  id: string
                  name: string
              }>
          >
        | undefined
}>`
    border-radius: 5px;
    width: 70%;
    border: ${(props) =>
        props.$invalid ? '2px solid red' : '2px solid #eaeaea'};
    outline: 0;
    caret-color: #eaeaea;
    color: grey;
`

const Label = styled.label<{
    $invalid:
        | Merge<
              FieldError,
              FieldErrorsImpl<{
                  id: string
                  name: string
              }>
          >
        | undefined
}>`
    color: ${(props) => (props.$invalid ? 'red' : '#9f9e9e')};
    font-weight: bold;
`

const Select = styled.select<{
    $invalid?:
        | Merge<
              FieldError,
              FieldErrorsImpl<{
                  id: string
                  name: string
              }>
          >
        | undefined
}>`
    width: 70%;
    background: white;
    color: gray;
    border-radius: 5px;
    padding-left: 5px;
    font-size: 12px;
    outline: 0;
    border: ${(props) =>
        props.$invalid ? '2px solid red' : '2px solid #eaeaea'};
    height: 24px;
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
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
`

const Span = styled.span`
    cursor: pointer;
    position: relative;
    top: 1%;
    left: 19%;
    font-size: 20px;
    color: #aaa;

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
`
const ContainerInfo = styled.div<{
    marginTop?: string
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
}>`
    display: flex;
    flex-direction: ${(props) => props.flexDirection ?? 'column'};
    justify-content: ${(props) => props.justifyContent};
    height: ${(props) => props.height};
    width: ${(props) => props.width};
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};
    padding: ${(props) => props.padding};
    margin-bottom: ${(props) => props.marginBottom};
    align-items: ${(props) => props.alignItems};
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`

export const RegisterEmployee = ({
    isOpen,
    show,
}: {
    isOpen: boolean
    show: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [modalDialog, setModalDialog] = useState(false)
    const { search, departments, currentPage, itemsPerPage } =
        useContext(MyContext)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateUserDto>()

    const onSubmit = async (data: CreateUserDto) => {
        const { message, type } = await registerEmployee(data)

        toast(message, {
            position: 'top-right',
            type,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
        })
        await search(currentPage, itemsPerPage)
        show(false)
        reset()
    }

    return (
        <div>
            {isOpen && (
                <Container>
                    <ContainerModal>
                        <ModalHeader>
                            <Text
                                fontSize="16px"
                                color="#9f9e9e"
                                fontWeight="bold"
                            >
                                Register Employee
                            </Text>
                            <Span
                                onClick={() => {
                                    show(false)
                                    reset()
                                }}
                            >
                                &times;
                            </Span>
                        </ModalHeader>
                        <ContainerInfo
                            justifyContent="center"
                            alignItems="center"
                            width="100%"
                            height="100%"
                            backgroundColor="white"
                        >
                            <Label $invalid={errors.firstName}>
                                First name
                            </Label>
                            <Input
                                {...register('firstName', { required: true })}
                                $invalid={errors.firstName}
                            />
                            <Label $invalid={errors.lastName}>Last name</Label>
                            <Input
                                {...register('lastName', { required: true })}
                                $invalid={errors.lastName}
                            />
                            <Label $invalid={errors.hireDate}>Hire date</Label>
                            <Input
                                {...register('hireDate', { required: true })}
                                $invalid={errors.hireDate}
                            />
                            <Label $invalid={errors.phone}>Phone</Label>
                            <Input
                                {...register('phone', { required: true })}
                                $invalid={errors.phone}
                            />
                            <Label $invalid={errors.address}>Address</Label>
                            <Input
                                {...register('address', { required: true })}
                                $invalid={errors.address}
                            />
                            <Label $invalid={errors.department}>
                                Department
                            </Label>
                            <Select
                                {...register('department', { required: true })}
                                $invalid={errors.department}
                            >
                                <option value="" defaultChecked>
                                    {'Select a department'}
                                </option>
                                {departments.map((item, i) => (
                                    <option value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </Select>
                            <ButtonPrimary
                                $primary
                                color="green"
                                height="30px"
                                fontSize="12px"
                                width="70%"
                                margin="10% 0 0 0"
                                onClick={handleSubmit(onSubmit)}
                            >
                                REGISTER
                            </ButtonPrimary>
                        </ContainerInfo>
                    </ContainerModal>
                    <DialogModal
                        mode="register"
                        isOpen={modalDialog}
                        show={setModalDialog}
                        text="Do you want to register this employee?"
                    />
                </Container>
            )}
        </div>
    )
}

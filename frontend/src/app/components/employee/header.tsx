import styled from 'styled-components'
import { ButtonPrimary, MainContainer } from '../../styles'
import { useState } from 'react'
import { RegisterEmployee } from './register-employee'

const Container = styled(MainContainer)<{
    alignItems?: string
    justifyContent?: string
    height?: string
    width?: string
}>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 15%;
    width: 100%;
`

const Text = styled.h1`
    font-size: large;
`

export const Header = () => {
    const [modalRegister, setModalRegister] = useState(false)
    return (
        <>
            <Container>
                <Text>All employees</Text>

                <ButtonPrimary
                    $primary
                    color="green"
                    onClick={() => setModalRegister(true)}
                >
                    New Employee
                </ButtonPrimary>
            </Container>
            <RegisterEmployee isOpen={modalRegister} show={setModalRegister} />
        </>
    )
}

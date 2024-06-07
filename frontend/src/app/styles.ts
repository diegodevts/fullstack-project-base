import styled, { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        font-family: 'poppins', 'sans-serif';
    }
`

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 70%;
    height: 95%;
    background-color: #f8f6f6;
`

export const Button = styled.button<{ marginRight?: string }>`
    background: none;
    border: none;
    cursor: pointer;
    margin-right: ${(props) => props.marginRight};
`

export const ButtonPrimary = styled(Button)<{
    $primary?: boolean
    height?: string
    width?: string
    top?: string
    color?: string
    margin?: string
    fontSize?: string
}>`
    top: ${(props) => props.top};
    width: ${(props) => props.width};
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${(props) => props.height ?? '30px'};
    background: ${(props) => (props.$primary ? props.color : 'white')};
    color: ${(props) => (props.$primary ? 'white' : props.color)};
    font-size: ${(props) => props.fontSize ?? '15px'};
    margin: ${(props) => props.margin ?? '1em'};
    padding: 0.25em 1em;
    border: ${(props) => '2px solid ' + props.color};
    border-radius: 5px;
    :hover {
        background: ${(props) => (props.$primary ? 'white' : props.color)};
        color: ${(props) => (props.$primary ? props.color : 'white')};
    }
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

    @media (max-width: 740px) {
        font-size: x-small;
    }
`

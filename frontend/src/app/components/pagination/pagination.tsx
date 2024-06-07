import { useContext, useMemo } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import styled from 'styled-components'
import MyContext from '../../contexts/items-context'

const PaginationDiv = styled.div`
    user-select: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    width: 0 30%;
`
const Ul = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    margin-right: 5px;
    padding: 5px 10px;
    background-color: #f8f6f6;
    color: #333;
    cursor: pointer;
`

const Li = styled.li<{ color?: string }>`
    margin-right: 5px;
    padding: 5px 10px;
    background-color: #f8f6f6;
    color: ${(props) => props.color};
    cursor: pointer;
    font-weight: bold;
`

const Pagination = () => {
    const { currentPage, setCurrentPage, totalPages } = useContext(MyContext)
    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    useMemo(() => {
        if (totalPages !== 0 && totalPages < currentPage) {
            setCurrentPage(totalPages)
        }
    }, [totalPages])

    const renderPageNumbers = () => {
        const pageNumbers = []
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <Li
                    key={i}
                    color={i === currentPage ? 'blue' : '#9f9e9e'}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </Li>
            )
        }
        return pageNumbers
    }

    return (
        <PaginationDiv>
            <FaChevronLeft
                color="#9f9e9e"
                onClick={() =>
                    setCurrentPage((value) => (value > 1 ? value - 1 : 1))
                }
                cursor="pointer"
            />
            <Ul>{renderPageNumbers()}</Ul>
            <FaChevronRight
                color="#9f9e9e"
                onClick={() =>
                    setCurrentPage((value) =>
                        value < totalPages ? value + 1 : totalPages
                    )
                }
                cursor="pointer"
            />
        </PaginationDiv>
    )
}

export default Pagination

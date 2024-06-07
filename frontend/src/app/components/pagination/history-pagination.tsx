import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import styled from 'styled-components'

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
    background-color: #fff;
    color: #333;
    cursor: pointer;
`

const Li = styled.li<{ color?: string }>`
    margin-right: 5px;
    padding: 5px 10px;
    background-color: #fff;
    color: ${(props) => props.color};
    cursor: pointer;
    font-weight: bold;
`

const HistoryPagination = ({
    totalPages,
    currentPage,
    setCurrentPage,
}: {
    totalPages: number
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}) => {
    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

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

export default HistoryPagination

import React, {FC, useState} from 'react'
import usersClasses from '../../users/users.module.css'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    portionSize?: number
    isLoading: boolean
    onPageChanged: (pageNumber: number) => void
}

const Paginator: FC<PropsType> = ({
                                        totalItemsCount,
                                        pageSize,
                                        currentPage,
                                        portionSize = 15,
                                        isLoading,
                                        onPageChanged
}) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize) // count quantity of pages

    // pagination
    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const pages = []
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={isLoading ? usersClasses.pagesLoading : usersClasses.pages}>
            {portionNumber > 1 &&
            <button
                className={usersClasses.page}
                onClick={ () => {setPortionNumber(portionNumber - 1)} }
            >&lt;</button>
            }

            {pages
                .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map(page => {
                    return <div
                        key={page}
                        className={currentPage === page
                            ? usersClasses.pageSelected
                            : usersClasses.page }
                        onClick={ () => {onPageChanged(page)} }
                    >{page}</div>
                })
            }

            {portionCount > portionNumber &&
            <button
                className={usersClasses.page}
                onClick={ () => { setPortionNumber(portionNumber + 1)} }
            >&gt;</button>
            }
        </div>
    )
}

export default Paginator

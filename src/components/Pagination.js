import React from 'react'
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";
import { useSearchParams } from 'react-router-dom';

export default function Pagination() {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleChangePage = (value) => {
        setSearchParams(`?page=${value}`)
    }

    const handleNextPage = () => {
        const page = searchParams.get('page')

        setSearchParams(`?page=${Number(page) + 1}`)
    }

    const handlePrevPage = () => {
        const page = searchParams.get('page')

        return Number(page) <= 1
            ?
            null
            :
            setSearchParams(`?page=${Number(page) - 1}`)
    }

    return (
        <div className='flex justify-center gap-2.5 text-secondary items-center'>
            <button className='font-bold text-xl' onClick={handlePrevPage}><IoChevronBack /></button>

            <div className='flex gap-2.5 items-center font-semibold'>
                <button onClick={() => handleChangePage(1)} className={`${searchParams.get("page") === '1' && 'text-white'}`}>1</button>
                <button onClick={() => handleChangePage(2)} className={`${searchParams.get("page") === '2' && 'text-white'}`}>2</button>
                <button onClick={() => handleChangePage(3)} className={`${searchParams.get("page") === '3' && 'text-white'}`}>3</button>
                <span>...</span>
                <button onClick={() => handleChangePage(10)} className={`${searchParams.get("page") === '10' && 'text-white'}`}>10</button>
            </div>

            <button className='font-bold text-xl' onClick={handleNextPage}><IoChevronForwardOutline /></button>
        </div>
    )
}

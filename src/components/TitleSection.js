import React from 'react'
import { GoChevronRight } from 'react-icons/go'

export default function TitleSection({ title, hightlight, arrow }) {
    return (
        <button className='flex items-center gap-2.5'>
            <h3 className='text-xl font-bold flex items-center gap-1.5'>{hightlight && <span className='text-oran'>{hightlight}</span>} {title}</h3>
            {
                !arrow && <GoChevronRight className='text-2xl translate-y-[1px]' />
            }
        </button>
    )
}

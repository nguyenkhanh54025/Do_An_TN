import React from 'react'
import TitleSection from '../components/TitleSection'
import MovieHistory from '../components/MovieHistory'
import Pagination from '../components/Pagination'

export default function MovieFollowingPage() {
    return (
        <main className='section container'>
            <section className='section'>
                <TitleSection title='Phim đang theo dõi' />

                <div className='grid grid-cols-6 gap-y-5 gap-x-[24px]'>
                    <MovieHistory />
                    <MovieHistory />
                    <MovieHistory />
                    <MovieHistory />
                    <MovieHistory />
                    <MovieHistory />
                    <MovieHistory />
                    <MovieHistory />
                    <MovieHistory />
                    <MovieHistory />
                    <MovieHistory />
                    <MovieHistory />
                </div>

                <Pagination />
            </section>
        </main>
    )
}

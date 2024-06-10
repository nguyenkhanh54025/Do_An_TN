import React from 'react'
import HeroSection from '../sections/HomePage/HeroSection'
import GoodMovie from '../sections/HomePage/GoodMovie'
import NewMovie from '../sections/HomePage/NewMovie'
import VIPMovie from '../sections/HomePage/VIPMovie'
import SeriesMovie from '../sections/HomePage/SeriesMovie'
// import AboutMovie from '../sections/HomePage/AboutMovie'
// import InfoCorresponding from '../sections/HomePage/InfoCorresponding'
// import ViewTogether from '../sections/HomePage/ViewTogether'
import ListMovie from '../sections/HomePage/ListMovie'
import TopMovie from '../sections/HomePage/TopMovie'
import SeeMoreMovie from '../sections/HomePage/SeeMoreMovie'
// import ReviewMovie from '../sections/HomePage/ReviewMovie'

export default function HomePage() {
    return (
        <main className='section40'>
            <HeroSection />
            {/* <AboutMovie /> */}
            <ListMovie />
            <GoodMovie />
            <NewMovie />
            <SeriesMovie />
            <VIPMovie />
            <TopMovie />
            <SeeMoreMovie />
            {/* <ReviewMovie /> */}
            {/* <InfoCorresponding />
            <ViewTogether /> */}
        </main>
    )
    
}

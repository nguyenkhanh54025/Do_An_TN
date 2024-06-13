import React from 'react'

export default function VideoSection({address}) {
    return (
        <video controls={true} muted={true} autoPlay={true} className='w-full'>
            <source src={address}type='video/mp4' />
            Your browser does not support the video tag.
        </video>
    )
}

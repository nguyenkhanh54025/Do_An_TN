import React from 'react'

export default function ActorSection({ actor }) {
    return (
        <section className='section'>
            <h3 className='text-xl font-bold'>Diễn viên </h3>

            <div className='grid grid-cols-2 gap-5'>
                {actor && actor.map(item => (
                    <ActorItem key={item.id} name={item.name} avatar={item.avatar} /> 
                ))}
            </div>
        </section>
    );
}

export const ActorItem = ({ name, avatar }) => {
    return (
        <div className='flex gap-5 items-center'>
            <img src={avatar} alt='' className='w-[93px] h-[115px] object-cover rounded-[10px]' />
            <p>{name}</p>
        </div>
    );
};

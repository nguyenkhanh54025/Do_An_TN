import React, { useState, useEffect } from 'react';
import HeroVideo from '../../components/HeroVideo';

export default function HeroSection() {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/movie/HeroSeasion');
            const jsonData = await response.json();
          
            if (jsonData.length >= 6) {
                setData1(jsonData.slice(0, 2));
                setData2(jsonData.slice(3, 4)); 
                setData3(jsonData.slice(5, 7));
            } else {
                console.error('Not enough data to process');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <section className='flex gap-2.5 container'>
            <div className='w-1/3 grid gap-2.5'>
                {data1 && data1.map(item => (
                    <HeroVideo key={item.id} id={item.id} poster={item.thumbnail} title={item.name} type={item.type} />
                ))}
            </div>
            <div className='w-2/3  '>
                { data2 && data2.map(item => (
                        <HeroVideo  key={item.id}  id={item.id} poster={item.thumbnail} title={item.name} type={item.type} />
                    ))}
            </div>
            <div className='w-1/3 grid gap-2.5'>
                {data3 && data3.map(item => (
                    <HeroVideo  key={item.id} id={item.id} poster={item.thumbnail} title={item.name} type={item.type} />
                ))}
            </div>
        </section>
    );
}

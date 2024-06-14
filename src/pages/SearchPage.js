import React, { useState,useEffect } from 'react';
import Pagination from '../components/Pagination';
import { IoIosSearch } from 'react-icons/io';
import MovieGridItem from '../components/MovieGridItem';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [genres, setGenres] = useState([]);
    const [countries, setCountries] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const value = searchParams.get('value');

    useEffect(() => {
        if (value) {
            handleSubmit(); // Fetch data if value exists
        }
    }, [value]); 

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/movie/search', {
                params: {
                    query: value,
                    genres: genres.join(','), // Join selected genres into a comma-separated string
                    countries: countries.join(',') // Join selected countries into a comma-separated string
                }
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching:', error);
        }
        setLoading(false);
    };
    const handleSubmit1 = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/movie/search', {
                params: {
                    query: searchTerm,
                    genres: genres.join(','), // Join selected genres into a comma-separated string
                    countries: countries.join(',') // Join selected countries into a comma-separated string
                }
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching:', error);
        }
        setLoading(false);
    };
    const handleFilter = async (e) =>{
        e.preventDefault();
        setLoading(true);
        console.log(genres,' | ',countries)
        try{
            const response = await axios.get('http://127.0.0.1:8000/api/movie/filter', {
                params: {
                    genres: genres.join(', '), 
                    countries: countries.join(', ') 
                }
            });
            setSearchResults(response.data);
        }catch(error){
            console.error('Error: ',error);
        }
        setLoading(false);
    }
    const handleGenreChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setGenres([...genres, value]); 
        } else {
            setGenres(genres.filter(genre => genre !== value)); 
        }
    
    };

    const handleCountryChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setCountries([...countries, value]); // Add checked country to countries array
        } else {
            setCountries(countries.filter(country => country !== value)); // Remove unchecked country from countries array
        }
    };
    
    return (
        <main className='section container flex !flex-row'>
            <section className='w-[30%] flex flex-col gap-5'>
                <h2 className='text-[25px] font-bold'>Bộ lọc</h2>

                <div className='flex flex-col gap-5'>
                    <form className='relative text-white' onSubmit={handleSubmit1}>
                        <input 
                            type='text' 
                            placeholder='Tìm kiếm' 
                            className='px-5 py-2.5 w-full bg-secondary rounded-[10px] border-gray border-[1px]'
                            name="value"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type='submit' className='absolute top-1/2 right-5 -translate-y-1/2 text-xl'><IoIosSearch /></button>
                    </form>
                    <form className='text-white flex flex-col gap-5'>
                        <div className='flex flex-col gap-[30px] bg-black px-5 py-[30px] rounded-[10px]'>
                            <h3 className='text-xl font-bold'>Thể loại</h3>

                            <div className='text-gray flex gap-[30px]'>
                                <div className='flex flex-col gap-5 w-full'>
                                    <label className='block'>
                                        <input type='checkbox' className='mr-2.5' value='1' onChange={handleGenreChange} />
                                        Hành động
                                    </label>
                                    <label className='block'>
                                        <input type='checkbox' className='mr-2.5' value='2' onChange={handleGenreChange} />
                                        Phiêu lưu
                                    </label>
                                    <label className='block'>
                                        <input type='checkbox' className='mr-2.5' value='3' onChange={handleGenreChange} />
                                        Chính kịch
                                    </label>
                                    <label className='block'>
                                        <input type='checkbox' className='mr-2.5' value='4' onChange={handleGenreChange} />
                                        Giả tưởng
                                    </label>
                                    <label className='block'>
                                        <input type='checkbox' className='mr-2.5' value='5' onChange={handleGenreChange} />
                                        Cho con trai
                                    </label>
                                    <label className='block'>
                                        <input type='checkbox' className='mr-2.5' value='6' onChange={handleGenreChange} />
                                        Lịch sử
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-[30px] bg-black px-5 py-[30px] rounded-[10px]'>
                            <h3 className='text-xl font-bold'>Quốc gia</h3>

                            <div className='text-gray flex flex-col gap-5 w-full'>
                                <label className='block'>
                                    <input type='checkbox' className='mr-2.5' value='USA' onChange={handleCountryChange} />
                                    Mỹ
                                </label>
                                <label className='block'>
                                    <input type='checkbox' className='mr-2.5' value='Japan' onChange={handleCountryChange} />
                                    Nhật Bản
                                </label>
                                <label className='block'>
                                    <input type='checkbox' className='mr-2.5' value='Vietnam' onChange={handleCountryChange} />
                                    Việt Nam
                                </label>
                            </div>
                        </div>

                        <button className='px-[15px] py-2.5 bg-blue rounded-[10px]' onClick={handleFilter}>Xác nhận</button>
                    </form>
                </div>
            </section>

            <section className='w-[70%] flex flex-col gap-5'>
                <h2 className='text-[25px] font-bold'>Bộ phim</h2>
                <div className='flex flex-col gap-5'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className='grid grid-cols-4 gap-x-[30px] gap-y-[20px]'>
                             {searchResults &&
                            searchResults.map((item, index) => (
                                <MovieGridItem key={index} id={item.id} nameMovie={item.name} poster={item.thumbnail} video_duration={item.video_duration} nation={item.nation} viewing_time={item.viewing_time} />
                            ))}
                        </div>
                    )}
                    <Pagination />
                </div>
            </section>
        </main>
    )
}
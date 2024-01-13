import React from 'react'
import { BsArrowLeftCircleFill } from "react-icons/bs";
import Navbar from '../components/Navbar';
import SingleEntity from '../components/SingleEntity';

const Home = () => {
    return (
        <>
            <main className=' border-red-500 p-4 min-h-screen'>


                <div className=' w-full grid grid-cols-1 gap-6 h-fit border-black mx-auto max-w-[1280px]'>


                    {/* Navbar */}
                    <section className='border-b h-[4rem] p-4 flex gap-4 items-center border-gray-400'>
                        <BsArrowLeftCircleFill className='text-xl cursor-pointer text-gray-400' />
                        <Navbar />
                    </section>

                    {/* Main Screen */}
                    <section className='border p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-x-0 gap-y-9 max-h-fit border-gray-300 rounded-md '>
                        <SingleEntity name={"App.jsx"} type={"folder"}/>
                        <SingleEntity name={"App.jsx"} type={"folder"}/>
                        <SingleEntity name={"App.jsx"} type={"folder"}/>
                        <SingleEntity name={"App.jsx"} type={"folder"}/>
                        <SingleEntity name={"Navbar.jsx"} type={"file"}/>
                        <SingleEntity name={"image.jpg"} type={"jpg"}/>
                        <SingleEntity name={"image.jpg"} type={"PDF"}/>
                        <SingleEntity name={"image.jpg"} type={"txt"}/>
                        <SingleEntity name={"image.jpg"} type={"html"}/>
                        <SingleEntity name={"image.jpg"} type={"txt"}/>
                        <SingleEntity name={"image.jpg"} type={"html"}/>
                      
                    </section>


                </div>


            </main>
        </>
    )
}

export default Home

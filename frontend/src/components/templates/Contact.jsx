import React from 'react'
import Navbar from './Navbar'

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-xl mx-4">
          <h1 className="text-gray-800 font-serif text-4xl md:text-5xl font-bold mb-4">
            Coming Soon!
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            We are working hard to bring this page to life. Stay tuned for
            updates!
          </p>
          <div className="mt-6">
            <button className="px-6 py-3 bg-purple-500 text-white rounded-full shadow-md hover:bg-purple-600 transition-all duration-300">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
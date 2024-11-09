import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Movies = ({forwardPage,backwardPage,movies,addToWatchList,deleteMovie,pgCount,watchList}) => {
  return (
    <div>
    <div className="banner relative">
        <p className="bg-opacity-60 text-center bg-black text-white absolute bottom-0 left-0 w-full p-2">
          The Maze Runner
        </p>
    </div>
      <div className="m-2">
        <h3 className="text-center font-bold m-5">Trending Movies</h3>
        <div className="flex justify-between gap-y-4 mx-1 flex-wrap">
        {movies.map((mov) => {
          return (
          <div key={mov.id}
            className="MovieCard relative hover:scale-105 transform transition duration-200 ease-in-out" 
            style={{
              backgroundImage:
                `url(${mov.img})`,
            }}
          >
          {watchList.some((movi)=> movi.id === mov.id) ? (
            <span className='float-right m-3 bg-black bg-opacity-60 rounded-full p-1 cursor-pointer' onClick={() => deleteMovie(mov.id)}>&#10060;</span>  
          ) : (
            <span className='float-right m-3 bg-black bg-opacity-60 rounded-full p-1 cursor-pointer' onClick={() => addToWatchList(mov.id)}>&#128525;</span>
          )
          } 
            <p className="bg-opacity-60 text-center bg-black text-white absolute bottom-0 left-0 w-full p-2">
              {mov.name}
            </p>
          </div>)
})  
      }
      </div>
      </div>
      <div className="flex gap-5 justify-center items-center my-4 bg-stone-600">
        <FaArrowLeft onClick={backwardPage} className="font-semibold"/>
        <div  className="font-semibold">{pgCount}</div>
        <FaArrowRight onClick={forwardPage}  className="font-semibold"/>
      </div>
    </div>
  )
}

export default Movies
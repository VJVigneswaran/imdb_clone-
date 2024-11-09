import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const WatchList = ({ watchList, setWatchList,deleteMovie }) => {
   const [searchQuery, setSearchQuery] = useState(""); // New state for search input                                                                                                                      
   const [genreList, setGenreList] = useState(["All Genres"]);
   const [currGenre,setCurrGenre] = useState("All Genres");

   useEffect(()=>{
   let temp = watchList.flatMap((mov) => mov.genre);
   temp = [...new Set([...genreList, ...temp])];
   setGenreList(temp);
   },[watchList]);

   const topRatings = () => {
      const sortList = [...watchList].sort((movA,movB)=> movA.rating - movB.rating);
      setWatchList(sortList);
   };

   const lowRatings = () => {
      const sortList = [...watchList].sort((movA,movB)=> movB.rating - movA.rating);
      setWatchList(sortList);
   };

   const handleSearch = (e) => {
      setSearchQuery(e.target.value);
   };

   return (
      <main>
         <div className='my-5'>
            <ul className='flex justify-center gap-5'>
            {genreList.map((genre, index) => {
               return <li key={index} className={`${
                  currGenre === genre ? "bg-blue-500" : "bg-gray-400"
                } p-2 rounded-md cursor-pointer`} onClick={()=>setCurrGenre(genre)}>{genre}</li>
             })
            }       
            </ul>
         </div>
         <div className='text-center'>
            <input
               type='text'
               placeholder='Search For Movies'
               className='bg-gray-300 p-2 outline-none'
               value={searchQuery}
               onChange={handleSearch}
            />
         </div>
         <table className='my-4 mx-auto w-11/12'>
            <thead>
               <tr>
                  <th>Name</th>
                  <th className='flex items-center justify-center gap-2'>
                     <FaArrowUp onClick={topRatings} className='cursor-pointer' /> Ratings
                     <FaArrowDown onClick={lowRatings} className='cursor-pointer' />
                  </th>
                  <th>Popularity</th>
                  <th>Genre</th>
               </tr>
            </thead>
            <tbody>
               {watchList.length > 0 ? (
                  watchList.filter((mov) =>  mov.name.toLowerCase().includes(searchQuery.toLowerCase())).filter((mov) => 
                     // Apply genre filter only if currGenre is not "All"
                     currGenre === "All Genres" || mov.genre.includes(currGenre)
                     ).map((mov) => (
                     <tr className='text-center' key={mov.id}>
                        <td className='flex gap-5 items-center'>
                           <img src={`${mov.img}`} alt={`${mov.name}`} className='w-28 h-20' />
                           {mov.name}
                        </td>
                        <td>{mov.rating}</td>
                        <td>{mov.popularity}</td>
                        <td>{Array.isArray(mov.genre) ? mov.genre.join(", ") : mov.genre}</td>
                        <td onClick={() => deleteMovie(mov.id)} className='text-red-600 font-bold cursor-pointer'>
                           Delete
                        </td>
                     </tr>
                  ))
               ) : (
                  <tr>
                     <td colSpan="5" className='text-center'>Your watchlist is empty or no matches found</td>
                  </tr>
               )}
            </tbody>
         </table>
      </main>
   );
};

export default WatchList;

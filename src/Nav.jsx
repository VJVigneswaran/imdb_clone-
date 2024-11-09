import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="flex gap-5 p-2">
    <img
      src="https://e7.pngegg.com/pngimages/59/893/png-clipart-movie-reel-illustration-film-clapperboard-cinematic-techniques-clapperboard-film-film-elements-monochrome-photographic-film.png"
      className="w-20 h-16"
    />
    <ul className="flex gap-5 text-2xl items-center text-blue-600 font-semibold">
      <li><Link to={"/"}>Movies</Link></li>
      <li><Link to={"watchList"}>WatchList</Link></li>
    </ul>
  </nav>
  )
}

export default Nav
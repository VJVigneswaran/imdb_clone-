import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./Nav";
import { Route, Routes } from "react-router-dom";
import Movies from "./Movies";
import WatchList from "./WatchList";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [movies, setMovies] = useState([]);
  const [pgCount, setPgCount] = useState(1);
  const [watchList,setWatchList] = useState([]);

  
  useEffect(() => {   
    const fetchMovies = async () => {
      const colRef = collection(db, "movies"); 
      const querySnapshot = await getDocs(colRef); 
      let fetchedMovies = [];
      querySnapshot.forEach((doc) => {
        fetchedMovies.push({ id: doc.id, ...doc.data() }); 
      });
      setMovies(fetchedMovies);
      
      // Initialize watchList from localStorage or set to an empty array if null
      const storedWatchList = JSON.parse(localStorage.getItem("movies")) || [];
      setWatchList(Array.isArray(storedWatchList) ? storedWatchList : []);
    };
    fetchMovies();
  }, []);

  const backwardPage = () => {
    pgCount > 1 ? setPgCount(pgCount - 1) : pgCount;
  };

  const forwardPage = () => {
    setPgCount(pgCount + 1);
  };

  
  const addToWatchList = (movId) => {
    const watchListMovie = movies.find((movie) => movie.id === movId);
    alert(`${watchListMovie.name} is added to watchList`);

    if (watchListMovie && !watchList.some(movie => movie.id === movId)) { // Avoid duplicates
      const updatedWatchList = [...watchList, watchListMovie];
      setWatchList(updatedWatchList);
      localStorage.setItem("movies", JSON.stringify(updatedWatchList));
      console.log(updatedWatchList);
    }
  };

  const deleteMovie = (movId) => {
    const updatedWatchList = watchList.filter((mov) => mov.id !== movId);
    setWatchList(updatedWatchList);
    localStorage.setItem("movies", JSON.stringify(updatedWatchList)); // Update localStorage
  };

  return (
    <>
      <Nav />
      <Routes>
        <Route
          path={"/"}
          element={
            <Movies
              forwardPage={forwardPage}
              backwardPage={backwardPage}
              movies={movies}
              addToWatchList={addToWatchList}
              pgCount={pgCount}
              watchList={watchList}
              deleteMovie={deleteMovie}
            />
          }
        />
        <Route path={"watchList"} element={<WatchList watchList={watchList} setWatchList={setWatchList} deleteMovie={deleteMovie}/>} />
      </Routes>
    </>
  );
}

export default App;

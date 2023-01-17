import { useQuery } from "@apollo/client"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import MovieCard from "../components/MovieCard"
import { GET_ALL_MOVIES } from "../queries/movie"
import { fetchMovies } from "../store/actions/actionCreator"
import Preloader from "./Preloader"




export default function MovieList() {

    // const dispatch = useDispatch()
    // let [loading,setLoading] = useState(false)

    // useEffect(() => {
    //     dispatch(fetchMovies(setLoading))
    // }, [])

    // const { movies } = useSelector(state => state.movies)
    // console.log(movies);

    const { loading, error, data } = useQuery(GET_ALL_MOVIES)
    console.log(data, '<<<');



    if (loading) {
        return <Preloader />
    }

    return (
        <>
            <main>
                <h1 className="text-center text-light">Movie List</h1>
                <div className="container">
                    <div className="row">
                        {data?.showAllMovies.map(movie => {
                            return <MovieCard key={movie.id} movie={movie} ></MovieCard>
                        })}
                        {/* <moviecard v-for="movie in dataMovies" :key="movie.id" :movie="movie">
      </moviecard> */}
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    {/* <vue-awesome-paginate :total-items="totalMovie" :items-per-page={8} :max-pages-shown={8} v-model="currentPage" @click="fetchMovies">
    </vue-awesome-paginate> */}
                </div>
            </main>
        </>
    )
}
import {Link, useNavigate} from 'react-router-dom'
import { useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux'
import {fetchMovies } from "../store/actions/actionCreator"
import Preloader from './Preloader'
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_MOVIES } from '../queries/movie'


export default function HomeView() {
  
  // const dispatch = useDispatch()
  // let [loading,setLoading] = useState(false)

  // useEffect(()=>{
  //   dispatch(fetchMovies(setLoading))
  // },[])

  // const {movies} = useSelector(state=> state.movies)
  const { loading, error, data } = useQuery(GET_ALL_MOVIES)
  console.log(data, '<<<');
  if(loading){
    return <Preloader/>
  }
// return
  return (
    <div className="d-flex justify-content-center" style={{height : "80vh"}}>
      <div style={{ margin: '30px 30px' }} className="d-flex flex-column">
        <div className="card" style={{ width: '16rem', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif', margin: '13px 13px' }}>
          <div className="card-body">
            <h4 className="card-title text-dark">Number of Movie</h4>
            <p className="card-text text-center fs-2 text-dark" style={{ fontWeight: 'bold' }}>{data?.showAllMovies.length}</p>
          </div>
        </div>
        <div className="d-flex justify-content-around my-5">
          <Link to="/movies">
            <button className="btn btn-primary">See All Movies</button>
          </Link>
        </div>
      </div>
    </div>

  )
}
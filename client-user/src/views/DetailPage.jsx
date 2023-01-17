import { useQuery } from "@apollo/client"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { GET_MOVIE_BY_ID } from "../queries/movie"
import { fetchMovie } from "../store/actions/actionCreator"
import Preloader from "./Preloader"

export default function DetailPage() {
  // const dispatch = useDispatch()

  // let [data, setData] = useState({ Casts: { name: "" } })
  // let [loading,setLoading] = useState(false)

  const { id } = useParams()

  // useEffect(() => {
  //   dispatch(fetchMovie(id,setLoading))
  //     .then((data) => {
  //       setData(data)
  //     })
  // }, [])

  const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, {
    variables: {
        "showMovieByIdId": Number(id)
    }
})


console.log(data,'<<<ID');
  if(loading){
    return <Preloader/>
  }



  return (
    <div className="container ">
      <h1 className="text-center" style={{ color: 'white' }}>{data.showMovieById.title} </h1>
      <div className="d-flex" style={{ marginTop: '5rem' }}>
        <div>
          <img src={data.showMovieById.imgUrl} width={500} />
        </div>
        <div >
          <div className="d-flex justify-content-between">
            <table style={{ color: 'white', marginLeft: "2rem" }} >
              <tbody>
                <tr >
                  <th style={{ color: 'gold', width: '10rem' }}> <div> Rating</div>  </th>
                  <td ><div style={{ margin: "20px" }}>
                    {data.showMovieById.rating} <img className="mb-1" src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" style={{ width: '21px' }} alt="" />
                  </div></td>
                </tr>
                <tr >
                  <th style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold' }}> Synopsis </th>
                  <td >  <div style={{ margin: "20px" }}>{data.showMovieById.synopsis}</div></td>
                </tr>
                {/* <tr >
                  <th style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold' }}> Genre </th>
                  <td >  <div style={{ margin: "20px" }}>{data.showMovieById.Genre? data.showMovieById.Genre.name : ""}</div></td>
                </tr> */}
                {data.showMovieById.Casts.length ? <tr >
                  <th style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold' }}> Casts </th>
                  {/* <div className="d-flex-column justify-content-center"> */}
                    {data.showMovieById.Casts.map((el, i) => {
                      return <td key={i} style={{ margin: "20px" }}>  {el.name} <img src={el.profilePict} style={{ height: "150px" }} alt="Profile Picture" /> </td>                        
                      
                    })}
                  {/* </div> */}
                </tr> : null}
              </tbody>
            </table>


           
          </div>

        </div>

      </div>
      <div style={{ marginTop: "10rem" }}>
        <div className="d-flex justify-content-center">
          <h1 style={{ color: "white", marginBottom: "40px" }} >Trailer</h1>
        </div>
        <iframe className="mx-3 my-2" width={"100%"} height={"800"} src={data.showMovieById.trailerUrl} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />

      </div>
    </div>

  )
}
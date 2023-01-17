import {Link, useNavigate} from 'react-router-dom'

export default function MovieCard({ movie }) {

    const navigate = useNavigate()

    return (
     

        <div className="card mx-3 my-3 d-flex flex-column justify-content-between" style={{ width: '18rem' }}>
            <div>
                <img src={movie.imgUrl} className="card-img-top" style={{ height: '300px', objectFit: 'cover' }} />
                <div className="card-body text-dark text-center">
                    <h5 className="card-title">{movie.title}</h5>
                </div>
            </div>            
            <div className="card-body d-flex flex-column justify-content-end gap-2">
            <div className="d-flex justify-content-center">
            {movie.rating} <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" style={{ width: '20px' }} alt="" />

            </div>
        
                <button onClick={()=>navigate(`/movies/${movie.id}`)} className="btn btn-info">See Detail
                </button>
            </div>
        </div>

    )
}
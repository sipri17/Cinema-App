import baseUrl from '../baseUrl'

function showLoader(){
    document.getElementById('root').classList.add('visually-hidden')
    document.getElementById('loader').classList.remove('visually-hidden')
}

function hideLoader(){
    document.getElementById('root').classList.remove('visually-hidden')
    document.getElementById('loader').classList.add('visually-hidden')
}

export function fetchMovies(setLoading) {
    return async (dispatch, getState) => {
        try {
            showLoader()

            const res = await fetch(`${baseUrl}/public/movies`)
            if (!res.ok) {
                throw await res.json()
            }
            const data = await res.json()
            // console.log('>>>',data.movie);
            setLoading(false)
            dispatch({
                type: "movies/fetchSuccess",
                payload: data.movie
            })
            
            
        } catch (error) {
            console.error(error)
        }finally{
            hideLoader()
        }
    
    }
}




export function fetchMovie(id,setLoading) {
    return async (dispatch, getState) => {
        try {
            showLoader()
            const res = await fetch(`${baseUrl}/public/movies/${id}`, {
                headers: {
                    access_token: localStorage.access_token
                }
            })
            if (!res.ok) {
                throw await res.json()
            }
            const data = await res.json()

            dispatch({
                type: "movie/fetchSuccess",
                payload: data
            })

            return data

        } catch (error) {
            console.error(error)
        } finally{
            hideLoader()
        }
    }
}



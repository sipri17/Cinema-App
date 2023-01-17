const initialState= {
    movies : [],
    movie : {}
}

export default function moviesReducer(state=initialState,action){
    switch (action.type) {
        case "movies/fetchSuccess":
            return {...state,movies : action.payload}   
        case "movie/fetchSuccess":
            return {...state,movie : action.payload}   
        default:
            return state;
    }
}

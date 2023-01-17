const initialState = {
    genres : [],
    genre : {}
}

export default function genresReducer(state=initialState,action ){
    switch (action.type) {
        case "genres/fetchSuccess":
            return {...state,genres:action.payload}    
        case "genres/fetchSuccess":
            return {...state,genre:action.payload}    
        default:
            return state;
    }
}
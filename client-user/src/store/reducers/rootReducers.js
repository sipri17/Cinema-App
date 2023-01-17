import { combineReducers } from "redux";
import genresReducer from "./genresReducer";
import moviesReducer from "./moviesReducer";


const rootReducer = combineReducers({
     movies : moviesReducer,
     genres : genresReducer
}) 

export default rootReducer
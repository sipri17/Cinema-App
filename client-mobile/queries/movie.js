import { gql } from "@apollo/client"

export const GET_ALL_MOVIES = gql`
            query Query {
                showAllMovies {
                id
                title               
                imgUrl
                rating             
                }
            }
`

export const GET_MOVIE_BY_ID = gql`
            query Base($showMovieByIdId: Int) {
                showMovieById(id: $showMovieByIdId) {
                Casts {
                    name
                }
                imgUrl
                rating
                synopsis
                title
                User {
                    username
                }
                }
            }
`
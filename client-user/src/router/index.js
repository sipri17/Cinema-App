import { createBrowserRouter, redirect } from "react-router-dom";
import Root from '../components/Root'
import NotFound404 from '../views/NotFound404'
import HomeView from '../views/HomeView'
import MovieList from '../views/MovieList'
import DetailPage from '../views/DetailPage'




const router = createBrowserRouter([

    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <HomeView/>
            },
            {
                path: "/movies",
                element: <MovieList/>
            },
             {
                path: "/movies/:id",
                element: <DetailPage/>
            },
            {
                path: "*",
                element: <NotFound404 />
            },
        ]
    }
]);

export default router
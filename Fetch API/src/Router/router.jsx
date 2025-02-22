import {createBrowserRouter} from "react-router"
import Home from "../Pages/Home"
import About from "../Pages/About"
import App from "../App"
import Root from "../Pages/Root"
import NotFound from "../Pages/NotFound"
import Notes, { loader } from "../Pages/Notes"

export const rootRouter = createBrowserRouter([
    {path: "/", element: <Root/>, children:[
        {path: "home", element: <Home />},
        {path: "/about", element: <About />},
        {path: "/app", element: <App/>},
        {path: "*", element: <NotFound/>},
        {path: "/notes", element: <Notes/>, loader: loader}
    ]},
])
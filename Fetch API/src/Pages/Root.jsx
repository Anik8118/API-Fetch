import { Link, Outlet } from "react-router";
import App from "../App";
export default function Root() {
    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home Page</Link>
              </li>
              <li>
                <Link to="/about">About Page</Link>
              </li>
              <li>
                <Link to="/app">App</Link>
              </li>
              <li>
                <Link to="/notes">Notes</Link>
              </li>
            </ul>
            <Outlet/>
          </nav>
        </div>
        <div id="detail"></div>
        
      </>
    );
  }
  
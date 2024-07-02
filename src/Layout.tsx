import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">App</Link>
            </li>
            <li>
              <Link to="/history">Our History</Link>
            </li>
          </ul>
        </nav>
  
        <Outlet />
      </>
    )
  };

  export default Layout;
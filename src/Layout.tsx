import { Outlet, Link } from "react-router-dom";

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'white'
};

const Layout = () => {
    return (
      <>
        <nav>
          <ul className = "nav">
            <li className = "task">
              <Link style= {linkStyle} to="/">App</Link>
            </li>
            <li className = "task">
              <Link style = {linkStyle} to="/history">Our History</Link>
            </li>
          </ul>
        </nav>
  
        <Outlet />
      </>
    )
  };

  export default Layout;
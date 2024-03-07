import { NavLink } from "react-router-dom";
import { AuthConsumer } from "../store/auth";
import styles from "./Navstyle.module.css";
import logo from "./logonew.png";
function Navbar() {
  const { isloggedin } = AuthConsumer();
  return (
    <>
      <header>
        <div className={styles.container}>
          <div>
            <NavLink to="/">
              <img
                className={styles.logo}
                src={logo}
                width="250px"
                height="200px"
              ></img>
            </NavLink>
          </div>
          <nav>
            <ul className={styles.list}>
              <li>
                <NavLink to="/">Home </NavLink>
              </li>
              <li>
                <NavLink to="/about">About </NavLink>
              </li>
              {isloggedin ? (
                <li>
                  <NavLink to="/logout">Logout </NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register">Sign Up </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Sign In </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;

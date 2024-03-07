import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../components/home.module.css";
function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    } else {
      setIsLoggedIn(true);
    }
  }, []);
  const navigate = useNavigate();
  const handleButton = () => {
    if (isLoggedIn) {
      navigate("/createprojects");
    } else {
      navigate("/login");
    }
  };

  const handleProjects = () => {
    if (isLoggedIn) {
      navigate("/viewprojects");
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div className={styles.repoContainer}>
        <div className={styles.createProject}>
          <button onClick={handleButton}>Create Projects</button>
        </div>

        <div className={styles.viewProject}>
          <button onClick={handleProjects}>View Projects</button>
        </div>
      </div>
    </>
  );
}

export default Home;

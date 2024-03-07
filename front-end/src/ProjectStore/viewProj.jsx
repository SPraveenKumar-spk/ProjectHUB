import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./viewProj.module.css";
function ViewProj() {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setIsLoggedIn(false);
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/auth/viewprojects",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setData(result);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handlebtn = (projectData) => {
    navigate("/projectdetails", { state: { projectData } });
  };
  return (
    <>
      <div className={styles.details}>
        <div className={styles.heading}>
          <h1>Projects</h1>
          <input
            className={styles.search}
            type="text"
            name="search"
            id="search"
            placeholder="Search for Content"
          />
        </div>

        {isLoggedIn ? (
          <div className={styles.projects}>
            <ul>
              {data.map((items) => (
                <li key={items._id}>
                  <div className={styles.items}>
                    <p>Project Name: {items.projectname}</p>
                    <button
                      onClick={() => handlebtn(items)}
                      className={styles.btn}
                    >
                      view
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className={styles.status}>Please login</p>
        )}
      </div>
    </>
  );
}

export default ViewProj;

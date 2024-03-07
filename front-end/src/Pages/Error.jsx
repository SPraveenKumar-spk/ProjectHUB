import Home from "./Home";
import styles from "../components/error.module.css";
function Error() {
  return (
    <>
      <h2>404 Not Found</h2>
      <div className={styles.btn}>
        <button>
          <Home></Home>
        </button>
      </div>
    </>
  );
}

export default Error;

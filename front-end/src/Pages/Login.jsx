import styles from "../components/login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthConsumer } from "../store/auth";
import image from "../components/login.png";
function Login() {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const URL = "http://localhost:5000/api/auth/login";
  const handleInput = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    setuser({ ...user, [name]: val });
  };

  const navigate = useNavigate();
  const { localToken } = AuthConsumer();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const validation = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (validation.ok) {
        const { token, userId } = await validation.json();
        setuser({ email: "", password: "" });
        localToken(token);
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {}
  };
  return (
    <>
      <section className={styles.login}>
        <div>
          <img src={image} alt="image" width="600" height="600" />
        </div>
        <div className={styles.signin}>
          <h1>Sign In form</h1>
          <form onSubmit={handlesubmit}>
            <div className={styles.details}>
              <label className={styles.labelstyle} htmlFor="email">
                Email
              </label>
              <input
                type="text"
                className={styles.inputstyle}
                name="email"
                id="email"
                placeholder="Enter email address"
                autoComplete="off"
                value={user.email}
                onChange={handleInput}
                required
              />
            </div>
            <div className={styles.details}>
              <label className={styles.labelstyle} htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className={styles.inputstyle}
                name="password"
                id="password"
                placeholder="Enter your password"
                autoComplete="off"
                value={user.password}
                onChange={handleInput}
                required
              />
            </div>
            <div className={styles.submit}>
              <button type="submit"> Submit </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;

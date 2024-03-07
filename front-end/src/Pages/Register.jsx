import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthConsumer } from "../store/auth";
import styles from "../components/register.module.css";

function Register() {
  const [user, setuser] = useState({
    firstname: "",
    lastname: "",
    college: "",
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    setuser({ ...user, [name]: val });
  };
  const navigate = useNavigate();
  const { localToken } = AuthConsumer();
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const res_token = response.data;
        setuser({
          firstname: "",
          lastname: "",
          college: "",
          email: "",
          password: "",
        });
        navigate("/login");
        localStorage.setItem("token", response.data);
        localToken(res_token.token);
      } else {
        alert("Email already exits");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className={styles.registration}>
        <div>
          <img
            src="https://dreamplanetmedia.com/dist/image/login2.png"
            alt="image"
            width="700"
            height="700"
          />
        </div>
        <div className={styles.signup}>
          <h1>Sign Up form</h1>
          <form onSubmit={handlesubmit}>
            <div className={styles.details}>
              <label className={styles.labelstyle} htmlFor="firstname">
                First Name
              </label>
              <input
                type="text"
                className={styles.inputstyle}
                name="firstname"
                id="firstname"
                placeholder="Enter First Name"
                autoComplete="off"
                value={user.firstname}
                onChange={handleInput}
                required
              />
            </div>
            <div className={styles.details}>
              <label className={styles.labelstyle} htmlFor="lastname">
                Last Name
              </label>
              <input
                type="text"
                className={styles.inputstyle}
                name="lastname"
                id="lastname"
                placeholder="Enter Last Name"
                autoComplete="off"
                value={user.lastname}
                onChange={handleInput}
                required
              />
            </div>
            <div className={styles.details}>
              <label className={styles.labelstyle} htmlFor="college">
                College Name
              </label>
              <input
                type="text"
                className={styles.inputstyle}
                name="college"
                id="college"
                placeholder="Enter College Name"
                autoComplete="off"
                value={user.college}
                onChange={handleInput}
                required
              />
            </div>
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

export default Register;

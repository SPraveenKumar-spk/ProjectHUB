import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import SignUP from "./Pages/Register";
import SignIN from "./Pages/Login";
import Navbar from "./components/Navbar";
// import Footer from "./components/footer";
import Error from "./Pages/Error";
import Logout from "./Pages/Logout";
import CreateProjects from "./ProjectStore/createprojects";
import ViewProj from "./ProjectStore/viewProj";
import ProjDetails from "./ProjectStore/ProjDetails";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<SignUP />} />
          <Route path="/login" element={<SignIN />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/createprojects" element={<CreateProjects />} />
          <Route path="/viewprojects" element={<ViewProj />} />
          <Route path="/projectdetails" element={<ProjDetails />} />
          <Route path="*" element={<Error />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}
export default App;

import styles from "./projdetail.module.css";
import { useLocation } from "react-router-dom";
function ProjDetails() {
  const location = useLocation();
  const projectData = location.state?.projectData;

  return (
    <>
      <div className={styles.maincontainer}>
        <div>
          <ul>
            <li key={projectData._id}>
              <div className={styles.items}>
                <p>
                  <span>Project Name : </span> {projectData.projectname}
                </p>
                <p>
                  <span>Technology Stack Used : </span> {projectData.skills}
                </p>
                <p>
                  <span>Project Description : </span> {projectData.details}
                </p>
                <p>
                  <span>Repository Links : </span>
                  <a
                    href={projectData.links}
                    target="_blank"
                    title="Link to code"
                  >
                    {projectData.links}
                  </a>
                </p>
                {/* <p>
                  <span>Checkout : </span> {projectData.media}
                </p> */}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProjDetails;

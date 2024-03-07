import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./Projects.module.css";
function CreateProjects() {
  const [project, setProject] = useState({
    projectname: "",
    skills: "",
    details: "",
    media: "",
    links: "",
  });
  const handleInput = (e) => {
    const name = e.target.name;
    const val = e.target.value;

    setProject({ ...project, [name]: val });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/auth/createprojects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(project),
        }
      );

      if (response.ok) {
        setProject({
          projectname: "",
          skills: "",
          details: "",
          media: "",
          links: "",
        });
      }
    } catch (error) {}
  };
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <>
      <div className={styles.repo}>
        <form onSubmit={handleSubmit}>
          <div className={styles.details}>
            <label className={styles.labelstyle} htmlFor="projectname">
              Project Title :{" "}
            </label>
            <input
              type="text"
              className={styles.inputstyles}
              name="projectname"
              id="projectname"
              placeholder="Enter Project Name"
              autoComplete="off"
              value={project.projectname}
              onChange={handleInput}
              required
            />
          </div>
          <div className={`${styles.skills} ${styles.common}`}>
            <label className={styles.labelstyle} htmlFor="skills ">
              Technologies Stack :{" "}
            </label>
            <input
              type="text"
              className={styles.inputstyles}
              name="skills"
              id="skills"
              placeholder="Enter Technologies Used"
              autoComplete="off"
              value={project.skills}
              onChange={handleInput}
              required
            />
          </div>
          <div className={`${styles.description} ${styles.common}`}>
            <label className={styles.labelstyle} htmlFor="details">
              Description :{" "}
            </label>
            <textarea
              rows={10}
              cols={100}
              name="details"
              id="details"
              style={{ verticalAlign: "top" }}
              placeholder="Your project description "
              autoComplete="off"
              value={project.details}
              onChange={handleInput}
              required
            ></textarea>
          </div>
          <div className={`${styles.links} ${styles.common}`}>
            <label className={styles.labelstyle} htmlFor="links ">
              Github Link :{" "}
            </label>
            <input
              type="text"
              className={styles.inputstyles}
              name="links"
              id="links"
              placeholder="Enter github repo Used"
              autoComplete="off"
              value={project.links}
              onChange={handleInput}
              required
            />
          </div>
          <div className={`${styles.media} ${styles.common}`}>
            <div
              {...getRootProps()}
              className={`dropzone ${isDragActive ? "active" : ""}`}
            >
              <label className={styles.labelstyle} htmlFor="links ">
                Upload files :{" "}
              </label>
              <input {...getInputProps()} />
              <p>Drag and drop files here, or click to select files</p>
            </div>
            <div>
              <h4>Uploaded Files:</h4>
              <ul>
                {files.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.submit}>
            <button type="submit"> Submit </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateProjects;

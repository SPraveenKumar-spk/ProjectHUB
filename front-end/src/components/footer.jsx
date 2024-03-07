import footstyles from "./footer.module.css";

function Footer() {
  return (
    <>
      <div className={footstyles.footcontainer}>
        <p className={footstyles.copy}>
          &copy; 2024 ProjectHUB. All rights reserved.
        </p>
      </div>
    </>
  );
}

export default Footer;
